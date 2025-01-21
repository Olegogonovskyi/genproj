import { IsOptional, IsString } from 'class-validator';
import { BaseIndividualParseDto } from './baseIndividual.parse.dto';
import { BaseDatesParseDto } from './baseDates.parse.dto';
import { Type } from 'class-transformer';

export class BaseFamilyParseDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  uid?: string;

  @IsOptional()
  @IsString()
  updated?: string;

  @IsOptional()
  parents?: BaseIndividualParseDto[];

  @IsOptional()
  children?: BaseIndividualParseDto[];

  @IsOptional()
  @Type(() => BaseDatesParseDto)
  date?: BaseDatesParseDto;
}
