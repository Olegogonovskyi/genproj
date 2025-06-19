import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from 'src/helpers/transformHelper';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RegisterAuthResDto } from '../../../auth/dto/res/register.auth.res.dto';
import { StatInfoInterface } from '../../types/statInfo.Interface';
import { ArticleBlocksDto } from './articleBlocks.dto';
import { ParseBodyReqArticle } from '../../../../helpers/transform/parseBodyReqArticle';

export class BaseReqArticleDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty({
    description: 'Блоки статті у вигляді JSON-рядка',
    example: '[{"type":"TEXT","content":"Це текстовий блок"}]',
    type: 'string',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Transform(ParseBodyReqArticle.parse) //JSON-рядок у масив об'єктів перше парсимо, потім plainToInstance перетворює звичайний JavaScript-об’єкт в інстанс класу ArticleBlocksDto
  body: ArticleBlocksDto[];

  @ApiProperty({ type: [String], isArray: true })
  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image: string[];

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = false;

  user?: RegisterAuthResDto;

  @ApiPropertyOptional({ type: Object, description: 'stat info' })
  @IsOptional()
  statInfo?: StatInfoInterface;

  @ApiProperty({
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @Length(3, 30, { each: true })
  @ArrayMaxSize(5)
  @Transform(TransformHelper.trimArray)
  @Transform(TransformHelper.uniqueItems)
  @Transform(TransformHelper.toLowerCaseArray)
  tags: string[];
}
