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
import { ArticleViewEntity } from './article.View.entity';
import { ArticleBlockEnum } from '../../modules/articlesNew/enums/ArticleBlockEnum';

@Entity(EntityEnum.ARTICLENEW)
export class ArticleNewEntity extends IdCreateUpdateEntity {
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('jsonb', { nullable: false })
  body: Array<{
    type: ArticleBlockEnum;
    content?: string;
    imageBlock?: string[];
    alt?: string;
  }>;

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
