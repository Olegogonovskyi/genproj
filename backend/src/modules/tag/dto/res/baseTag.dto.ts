import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../helpers/transformHelper';
import { ArticleResDto } from '../../../articlesNew/dto/res/articleRes.dto';

export class BaseTagDto {
  @ApiProperty({ type: String })
  @IsString()
  id?: string;

  @ApiProperty({ type: String })
  @Length(0, 15)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  @IsString()
  name: string;

  articles: ArticleResDto[];
}
