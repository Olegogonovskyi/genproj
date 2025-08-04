import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TagsEntity } from '../../../database/entities/tag.entity';
import { TagsQertyDto } from '../../tag/dto/req/tags.qerty.dto';

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

  public async getList(query: TagsQertyDto): Promise<[TagsEntity[], number]> {
    const qb = this.createQueryBuilder('tag');
    qb.leftJoinAndSelect('tag.articles', 'articles');
    qb.loadRelationCountAndMap('tag.articleCount', 'tag.articles');
    if (query.search) {
      qb.andWhere('CONCAT(tag.name) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
