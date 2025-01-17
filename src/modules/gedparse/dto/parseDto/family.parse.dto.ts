import { IsOptional, IsString } from 'class-validator';
import { IndividualParseDto } from './individual.parse.dto';
import { DatesParseDto } from './dates.parse.dto';
import { Type } from 'class-transformer';

export class FamilyParseDto {
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
  parents?: IndividualParseDto[];

  @IsOptional()
  children?: IndividualParseDto[];

  @IsOptional()
  @Type(() => DatesParseDto)
  date: DatesParseDto;
}
