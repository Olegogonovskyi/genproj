import { Entity, Column, ManyToMany, VirtualColumn } from 'typeorm';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';
import { EntityEnum } from '../enums/entityEnum';
import { ArticleNewEntity } from './articleNew.entity';

@Entity(EntityEnum.TAG)
export class TagsEntity extends IdCreateUpdateEntity {
  @Column('text', { unique: true })
  name: string;

  @VirtualColumn({ query: () => 'NULL' })
  articleCount?: number;

  @ManyToMany(() => ArticleNewEntity, (entity) => entity.tags)
  articles?: ArticleNewEntity[];
}
