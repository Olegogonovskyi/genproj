import { Entity, Column, ManyToMany, VirtualColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';
import { EntityEnum } from '../enums/entityEnum';

@Entity(EntityEnum.TAG)
export class TagsEntity extends IdCreateUpdateEntity {
  @Column('text', { unique: true })
  name: string;

  @VirtualColumn({ query: () => 'NULL' })
  articleCount?: number;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];
}
