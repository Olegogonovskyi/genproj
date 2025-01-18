import { IsDate, IsOptional, IsString } from 'class-validator';
import { IndividualParseDto } from './individual.parse.dto';
import { FamilyParseDto } from './family.parse.dto';


export class DatesParseDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  updated?: string;

  @IsString()
  type: string;

  @IsDate()
  date: Date;

  @IsOptional()
  family?: FamilyParseDto;

  individuals: IndividualParseDto[];

  @IsOptional()
  @IsString()
  place: string;
}
