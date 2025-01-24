import { IsArray, IsOptional, IsString } from 'class-validator';
import { BaseIndividualParseDto } from './baseIndividual.parse.dto';
import { BaseFamilyParseDto } from './baseFamily.parse.dto';

export class BaseDatesParseDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  updatedmh?: string;

  @IsString()
  type: string;

  @IsString()
  date: string;

  @IsOptional()
  family?: BaseFamilyParseDto;

  @IsOptional()
  @IsArray()
  individuals?: BaseIndividualParseDto[];

  @IsOptional()
  @IsString()
  place: string;
}
