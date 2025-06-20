import {  IsEnum, IsString, Length, ValidateIf } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformHelper } from '../../../../helpers/transformHelper';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArticleBlockEnum } from '../../enums/ArticleBlockEnum';

export class ArticleBlocksDto {
  @ApiProperty({ enum: ArticleBlockEnum })
  @IsEnum(ArticleBlockEnum)
  type: ArticleBlockEnum;

  @ApiPropertyOptional({ type: String })
  @ValidateIf((o) => o.type === ArticleBlockEnum.TEXT)
  @IsString()
  @Length(1, 3000)
  @Transform(TransformHelper.trim)
  content?: string;

  @ApiPropertyOptional({ type: String })
  @ValidateIf((o) => o.type === ArticleBlockEnum.IMAGE)
  @IsString()
  @Length(1, 3000)
  @Transform(TransformHelper.trim)
  alt?: string;
}
