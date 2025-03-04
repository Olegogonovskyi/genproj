import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { BaseReqArticleDto } from '../req/baseReq-article.dto';
import { StatInfoInterface } from '../../types/statInfo.Interface';
import { IsOptional } from 'class-validator';

export class ArticleResDto extends PartialType(
  PickType(BaseReqArticleDto, [
    'id',
    'title',
    'description',
    'body',
    'isActive',
    'user',
    'statInfo',
    'tags',
    'image',
  ]),
) {
  @IsOptional()
  @ApiProperty({ type: Object, required: false })
  statInfo?: StatInfoInterface;
}
