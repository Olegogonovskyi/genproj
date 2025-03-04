import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TagsEntity } from '../../../database/entities/tag.entity';

@Injectable()
export class TagsRepository extends Repository<TagsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagsEntity, dataSource.manager);
  }

  public async getPopular(): Promise<TagsEntity[]> {
    const qb = this.createQueryBuilder('tag');
    qb.leftJoin('tag.articles', 'article');
    qb.addSelect('COUNT(article.id)', 'tag_articleCount');
    qb.groupBy('tag.id');
    qb.orderBy('"tag_articleCount"', 'DESC');
    qb.limit(10);

    return await qb.getMany();
  }
}
