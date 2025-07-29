import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../helpers/transformHelper';
import { ArticleResDto } from '../../../articlesNew/dto/res/articleRes.dto';

export class TagsResDto {
  @ApiProperty({ description: 'Tags id' })
  id: string;

  @ApiProperty({ description: 'Tags name' })
  @IsString()
  @Length(3, 15)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name: string;

  @ApiProperty({ description: 'Count of posts with Tag' })
  articleCount: number;

  @ApiProperty({ description: 'Related articles', type: [String] })
  @IsArray()
  articles: ArticleResDto[];
}
