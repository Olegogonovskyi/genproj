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
import { ArticleRepository } from '../repository/services/article.repository';
import { TagsRepository } from '../repository/services/tags.repository';
import { TagsEntity } from 'src/database/entities/tag.entity';
import { ArticleEntity } from 'src/database/entities/article.entity';
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

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly fileStorageService: FileStorageService,
    private readonly eventEmitter: EventEmitter2,
    private readonly articleViewRepository: ArticleViewRepository,
  ) {}

  private async addView(article: ArticleEntity): Promise<void> {
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
  ): Promise<ArticleEntity> {
    const { id, isVerified } = userData;

    if (!isVerified) {
      throw new UnauthorizedException('User is not verified');
    }

    const hasForbiddenWords = this.validateText(createArticleDto);

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
    }

    const articleData = {
      ...createArticleDto,
      userID: id,
      user: userData,
      editAttempts: hasForbiddenWords ? 1 : 0,
      isActive: !hasForbiddenWords,
      image: imageUrls,
    };

    const tags = await this.createTags(createArticleDto.tags);
    const savedArticle = await this.articleRepository.save(
      this.articleRepository.create({ ...articleData, tags }),
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
  ): Promise<[ArticleEntity, statInfo: StatInfoInterface]> {
    const article = await this.articleRepository.findOne({
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
  ): Promise<[ArticleEntity[], number]> {
    return await this.articleRepository.getList(query);
  }

  public async updateArticle(
    userData: RegisterAuthResDto,
    articleId: string,
    updateArticleDto: CreateUpdateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (userData.id != article.userID) {
      throw new Error('This is not your article!');
    }

    const hasForbiddenWords = this.validateText(updateArticleDto);
    const tags = await this.createTags(updateArticleDto.tags);

    if (hasForbiddenWords) {
      await this.articleRepository.save(
        this.articleRepository.merge(
          article,
          { ...updateArticleDto, tags },
          {
            isActive: false,
          },
        ),
      );

      throw new BadRequestException(
        `Validation failed in articleID ${articleId}`,
      );
    }

    this.articleRepository.merge(
      article,
      { ...updateArticleDto, tags },
      { isActive: true },
    );
    await this.articleRepository.save(article);
    return await this.articleRepository.findOne({
      where: { id: article.id },
      relations: ['user'], // розумію, що додаткове навантаження на базу, але додав, щоб підвантажило юзера, можна і забрати
    });
  }

  public async deleteArticle(articleId: string): Promise<void> {
    await this.articleRepository.delete({ id: articleId });
  }
}
