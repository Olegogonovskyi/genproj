import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../helpers/transformHelper';
import { ApiProperty } from '@nestjs/swagger';
import { ArticleBlockEnum } from '../../enums/ArticleBlockEnum';

export class ArticleBlocksDto {
  @ApiProperty({ enum: ArticleBlockEnum })
  @IsEnum(ArticleBlockEnum)
  type: ArticleBlockEnum;

  @ApiProperty({ type: String })
  @IsString()
  @Length(0, 3000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  content?: string;

  @ApiProperty({ type: [String], isArray: true })
  @IsOptional()
  @IsString({ each: true })
  @Length(0, 3000, { each: true })
  imageBlock?: string[];

  @ApiProperty({ type: String })
  @IsString()
  @Length(0, 3000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  alt?: string;
}
