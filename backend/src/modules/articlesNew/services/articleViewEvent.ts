import { ArticleNewEntity } from '../../../database/entities/articleNew.entity';

export class ArticleViewEvent {
  constructor(public readonly article: ArticleNewEntity) {}
}
