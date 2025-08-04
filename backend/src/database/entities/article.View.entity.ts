import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';
import { ArticleNewEntity } from './articleNew.entity';

@Entity(EntityEnum.ARTICLEVIEW)
export class ArticleViewEntity extends IdCreateUpdateEntity {
  @Column('text')
  articleID: string;
  @ManyToOne(() => ArticleNewEntity, (entity) => entity.views, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'articleID' })
  article: ArticleNewEntity;
}
