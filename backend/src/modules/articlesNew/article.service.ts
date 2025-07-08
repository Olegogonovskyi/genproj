import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUpdateArticleDto } from './dto/req/createUpdate.article.dto';
import { In } from 'typeorm';
import { ArticleListRequeryDto } from './dto/req/query.dto';
import { TagsRepository } from '../repository/services/tags.repository';
import { TagsEntity } from 'src/database/entities/tag.entity';
import { RegisterAuthResDto } from '../auth/dto/res/register.auth.res.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ArticleViewRepository } from '../repository/services/articleView.repository';
import { EventEnum } from './enums/EventEnum';
import { ArticleViewEvent } from './services/articleViewEvent';
import { ValidationCostants } from 'src/common/ValidationCostants';
import { ContentType } from '../filestorage/enums/content-type.enum';
import { FileStorageService } from '../filestorage/filestorageService';
import { StatInfoInterface } from './types/statInfo.Interface';
import { StatDateEnum } from './enums/StatDateEnum';
import { ArticleNewRepository } from '../repository/services/articleNew.repository';
import { ArticleNewEntity } from '../../database/entities/articleNew.entity';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleNewRepository: ArticleNewRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly eventEmitter: EventEmitter2,
    private readonly articleViewRepository: ArticleViewRepository,
  ) {}

  private async addView(article: ArticleNewEntity): Promise<void> {
    const view = this.articleViewRepository.create({ article });
    await this.articleViewRepository.save(view);
  }

  @OnEvent(EventEnum.ARTICLEVIEW)
  private async handleArticleViewedEvent(event: ArticleViewEvent) {
    await this.addView(event.article);
  }

  private validateText(dataToValidate: CreateUpdateArticleDto): boolean {
    return ValidationCostants.some((word) =>
      [dataToValidate.title, dataToValidate.body, dataToValidate.description]
        .join(' ')
        .toLowerCase()
        .includes(word.toLowerCase()),
    );
  }

  private async createTags(tags: string[]): Promise<TagsEntity[]> {
    if (!tags || tags.length === 0) return [];
    const uniqueTags = [...new Set(tags)];
    await this.tagsRepository.upsert(
      uniqueTags.map((name) => ({ name })),
      ['name'], // Конфлікт по полю 'name'
    );
    return this.tagsRepository.findBy({ name: In(tags) });
  }

  public async create(
    userData: RegisterAuthResDto,
    createArticleDto: CreateUpdateArticleDto,
    images: Array<Express.Multer.File>,
  ): Promise<ArticleNewEntity> {
    const { id, isVerified } = userData; // витягую інфо про юзера

    if (!isVerified) {
      throw new UnauthorizedException('User is not verified');
    } // перевірка юзера чи верифікований

    const hasForbiddenWords = this.validateText(createArticleDto); // чи не матюкається пес

    let imageUrls: string[];
    try {
      imageUrls = images?.length
        ? await Promise.all(
            images.map((file) =>
              this.fileStorageService.uploadFile(file, ContentType.ARTICLE, id),
            ),
          )
        : [];
    } catch (err) {
      throw new InternalServerErrorException('Images upload failed');
    } // вантажу фото головне

    const articleData = {
      ...createArticleDto,
      userID: id,
      user: userData,
      editAttempts: hasForbiddenWords ? 1 : 0,
      isActive: !hasForbiddenWords,
      image: imageUrls,
    };

    const tags = await this.createTags(createArticleDto.tags); // теги створюємо
    const savedArticle = await this.articleNewRepository.save(
      this.articleNewRepository.create({ ...articleData, tags }),
    );

    if (hasForbiddenWords) {
      throw new BadRequestException(
        `Validation failed. You have only 3 attempts to update article ${savedArticle.id}`,
      );
    }

    return savedArticle;
  }

  public async getById(
    articleId: string,
  ): Promise<
    [ArticleNewEntity: ArticleNewEntity, statInfo: StatInfoInterface]
  > {
    const article = await this.articleNewRepository.findOne({
      where: { id: articleId },
      relations: ['user'],
    });

    if (!article) {
      throw new NotFoundException(`Article with ID ${articleId} not found`);
    }

    this.eventEmitter.emit(
      EventEnum.ARTICLEVIEW,
      new ArticleViewEvent(article),
    );
    const statInfo: StatInfoInterface = {
      countViews: await this.articleViewRepository.count({
        where: { article: { id: articleId } },
      }),
      viewsByDay: await this.articleViewRepository.countViews(
        article.id,
        StatDateEnum.DAY,
      ),
      viewsByWeek: await this.articleViewRepository.countViews(
        article.id,
        StatDateEnum.WEEK,
      ),
      viewsByMonth: await this.articleViewRepository.countViews(
        article.id,
        StatDateEnum.MONTH,
      ),
    };
    return [article, statInfo];
  }

  public async getList(
    query: ArticleListRequeryDto,
  ): Promise<[ArticleNewEntity[], number]> {
    return await this.articleNewRepository.getList(query);
  }

  public async updateArticle(
    userData: RegisterAuthResDto,
    articleId: string,
    updateArticleDto: CreateUpdateArticleDto,
  ): Promise<ArticleNewEntity> {
    const article = await this.articleNewRepository.findOneBy({
      id: articleId,
    });
    if (userData.id != article.userID) {
      throw new Error('This is not your article!');
    }

    const hasForbiddenWords = this.validateText(updateArticleDto);
    const tags = await this.createTags(updateArticleDto.tags);

    await this.articleNewRepository.save(
      this.articleNewRepository.merge(
        article,
        { ...updateArticleDto, tags },
        {
          isActive: !hasForbiddenWords,
        },
      ),
    );

    if (hasForbiddenWords) {
      throw new BadRequestException(
        `Validation failed in articleID ${articleId}`,
      );
    }

    return await this.articleNewRepository.findOne({
      where: { id: article.id },
      relations: ['user'], // розумію, що додаткове навантаження на базу, але додав, щоб підвантажило юзера, можна і забрати
    });
  }

  public async deleteArticle(articleId: string): Promise<void> {
    await this.articleNewRepository.delete({ id: articleId });
  }
}
