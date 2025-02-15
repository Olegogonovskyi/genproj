import { PartialType, PickType } from '@nestjs/swagger';
import { BaseReqArticleDto } from '../req/baseReq-article.dto';

export class ArticleResDto extends PartialType(
  PickType(BaseReqArticleDto, [
    'id',
    'title',
    'description',
    'body',
    'isActive',
    'user',
    'countOfViews',
    'tags',
    'image',
  ]),
) {}
