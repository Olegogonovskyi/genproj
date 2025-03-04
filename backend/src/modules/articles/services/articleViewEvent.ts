import { ArticleEntity } from '../../../database/entities/article.entity';

export class ArticleViewEvent {
  constructor(public readonly article: ArticleEntity) {}
}
