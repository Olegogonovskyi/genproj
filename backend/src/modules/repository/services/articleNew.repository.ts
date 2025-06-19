import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ArticleEntity } from '../../../database/entities/article.entity';
import { ArticleListRequeryDto } from '../../articles/dto/req/query.dto';
import { ArticleNewEntity } from '../../../database/entities/articleNew.entity';

@Injectable()
export class ArticleRepository extends Repository<ArticleNewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }
  public async getList(
    query: ArticleListRequeryDto,
  ): Promise<[ArticleNewEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.andWhere('article.isActive = :isActive', { isActive: true });
    if (query.search) {
      qb.andWhere('CONCAT(article.title, article.description) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }

    if (query.tag) {
      qb.andWhere('tag.name = :tag');
      qb.setParameter('tag', query.tag);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
