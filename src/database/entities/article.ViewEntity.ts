import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';
import { ArticleEntity } from './article.entity';

@Entity(EntityEnum.ARTICLEVIEW)
export class ArticleViewEntity extends IdCreateUpdateEntity {
  @Column('text')
  postID: string;
  @ManyToOne(() => ArticleEntity, (entity) => entity.views, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'postID' })
  article: ArticleEntity;
}
