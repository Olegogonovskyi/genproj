import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticleViewEntity } from 'src/database/entities/article.ViewEntity';
import { StatDateEnum } from 'src/modules/articles/enums/StatDateEnum';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ArticleViewRepository extends Repository<ArticleViewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleViewEntity, dataSource.manager);
  }

  public async countViews(
    articleId: string,
    period: StatDateEnum,
  ): Promise<number> {
    let startDate: Date;
    switch (period) {
      case StatDateEnum.DAY:
        startDate = new Date(new Date().setHours(0, 0, 0, 0));
        break;
      case StatDateEnum.WEEK:
        startDate = new Date(new Date().setDate(new Date().getDate() - 7));
        break;
      case StatDateEnum.MONTH:
        startDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
        break;
      default:
        throw new BadRequestException('Invalid period');
    }

    const qb = this.createQueryBuilder('article_view');
    qb.where('article_view.articleID = :articleId', { articleId });
    qb.andWhere('article_view.created >= :startDate', {
      startDate: startDate,
    });
    qb.andWhere('article_view.created < :endDate', {
      endDate: new Date(new Date().setHours(23, 59, 59, 999)),
    });
    const count = await qb.getCount();

    return Number(count);
  }
}
