import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';
import { TagsEntity } from './tag.entity';
import { UsersEntity } from './users.entity';
import { ArticleViewEntity } from './article.ViewEntity';

@Entity(EntityEnum.ARTICLE)
export class ArticleEntity extends IdCreateUpdateEntity {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  body: string;

  @Column('simple-array', { nullable: false })
  image: string[];

  @Column('boolean', { default: false })
  isActive: boolean;

  @OneToMany(() => ArticleViewEntity, (entity) => entity.article)
  views?: ArticleViewEntity[];

  @Column('int', { default: 0 })
  countOfViews?: number;

  @Column('text')
  userID: string;
  @ManyToOne(() => UsersEntity, (entity) => entity.articles)
  @JoinColumn({ name: 'userID' })
  user?: UsersEntity;

  @ManyToMany(() => TagsEntity, (entity) => entity.articles)
  @JoinTable()
  tags?: TagsEntity[];
}
