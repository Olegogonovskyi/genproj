import { PickType } from '@nestjs/swagger';
import { ArticleResDto } from './articleRes.dto';

export class ArticleResItemDto extends PickType(ArticleResDto, [
  'id',
  'title',
  'description',
  'body',
  'created',
  'tags',
  'user',
]) {}
