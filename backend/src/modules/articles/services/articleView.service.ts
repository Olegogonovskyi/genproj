import { Injectable } from '@nestjs/common';
import { ArticleViewRepository } from 'src/modules/repository/services/articleView.repository';

@Injectable()
export class ArticleViewService {
  constructor(private readonly articleViewRepository: ArticleViewRepository) {}

  private async addView(articleId: number): Promise<void> {}
}
