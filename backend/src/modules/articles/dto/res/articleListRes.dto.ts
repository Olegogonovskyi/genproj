import { ArticleResItemDto } from './articleResItem.dto';
import { ArticleListRequeryDto } from '../req/query.dto';

export class ArticleListResDto extends ArticleListRequeryDto {
  data: ArticleResItemDto[];
  total: number;
}
