import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../helpers/transformHelper';

export class ChronologyBaseDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ type: String })
  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  description: string;

  @ApiProperty({ type: [String], isArray: true })
  @IsOptional()
  @IsString()
  @Length(0, 3000)
  image?: string[];

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
