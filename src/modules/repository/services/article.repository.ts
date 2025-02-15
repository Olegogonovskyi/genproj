import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleListRequeryDto } from '../../articles/dto/req/query.dto';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }
  public async getList(
    userId: string,
    query: ArticleListRequeryDto,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    if (query.search) {
      qb.andWhere('CONCAT(article.title, post.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.tag) {
      qb.andWhere('tag.name = :tag');
      qb.setParameter('tag', query.tag);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.followerID = :userId',
      { userId },
    );

    return await qb.getManyAndCount();
  }

  public async getById(
    userId: string,
    articleId: string,
  ): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');

    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.followerID = :userId',
      { userId },
    );
    qb.andWhere('article.id = :articleId', { articleId });

    return await qb.getOneOrFail();
  }
}
