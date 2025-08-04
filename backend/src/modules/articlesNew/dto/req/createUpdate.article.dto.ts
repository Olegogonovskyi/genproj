import { PickType } from '@nestjs/swagger';
import { BaseReqArticleDto } from './baseReq-article.dto';

export class CreateUpdateArticleDto extends PickType(BaseReqArticleDto, [
  'title',
  'description',
  'body',
  'tags',
]) {}
