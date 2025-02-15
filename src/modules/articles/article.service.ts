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
import { GetMeReq } from '../users/dto/res/GetMeReq.dto';
import { ArticleEntity } from 'src/database/entities/article.entity';
import { RegisterAuthResDto } from '../auth/dto/res/register.auth.res.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ArticleViewRepository } from '../repository/services/articleView.repository';
import { EmailService } from '../emailodule/emailodule.service';
import { UserRepository } from '../repository/services/users.repository';
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
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository,
  ) {}

  private async addView(article: ArticleEntity): Promise<void> {
    const view = this.articleViewRepository.create({ article });
    await this.articleViewRepository.save(view);
  }

  @OnEvent(EventEnum.ARTICLEVIEW)
  private async handleArticleViewedEvent(event: ArticleViewEvent) {
    await this.addView(event.article);
  }

  private async createTags(tags: string[]): Promise<TagsEntity[]> {
    // todo оптимізувати метод
    if (!tags || tags.length === 0) return [];
    const entities = await this.tagsRepository.findBy({ name: In(tags) });
    const existingTags = entities.map((entity) => entity.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await this.tagsRepository.save(
      newTags.map((tag) => this.tagsRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
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

    const hasForbiddenWords = ValidationCostants.some((word) =>
      [
        createArticleDto.title,
        createArticleDto.body,
        createArticleDto.description,
      ]
        .join(' ')
        .toLowerCase()
        .includes(word.toLowerCase()),
    );

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

    const postData = {
      ...createArticleDto,
      userID: id,
      user: userData,
      editAttempts: hasForbiddenWords ? 1 : 0,
      isActive: !hasForbiddenWords,
      image: imageUrls,
    };

    const tags = await this.createTags(createArticleDto.tags);
    const savedPost = await this.articleRepository.save(
      this.articleRepository.create({ ...postData, tags }),
    );

    if (hasForbiddenWords) {
      throw new BadRequestException(
        `Validation failed. You have only 3 attempts to update post ${savedPost.id}`,
      );
    }

    return savedPost;
  }

  public async getById(
    articleId: string,
  ): Promise<[ArticleEntity, statInfo: StatInfoInterface]> {
    const article = await this.articleRepository.findOne({
      where: { id: articleId },
      relations: ['user'],
    });

    if (!article) {
      throw new NotFoundException(`Post with ID ${articleId} not found`);
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

  public async updateuserData(
    userData: GetMeReq,
    articleId: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepository.findOneBy({ id: articleId });
    if (userData.id != article.userID) {
      throw new Error('This is not your post!');
    }
    this.articleRepository.merge(article, updateArticleDto);

    return await this.articleRepository.save(article);
  }
}
