import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { DatesParseDto } from './dates.parse.dto';
import { Type } from 'class-transformer';
import { FamilyParseDto } from './family.parse.dto';

export class IndividualParseDto {
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
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surName?: string;

  @IsOptional()
  @IsString()
  marriedSurName?: string;

  @IsString()
  sex: string = 'male';

  @IsBoolean()
  isDead: boolean = false;

  @IsOptional()
  @IsString()
  npfx: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsString()
  object: string;

  @IsOptional()
  familyAsParent?: FamilyParseDto[];

  @IsOptional()
  familyAsChild?: FamilyParseDto[];

  @IsOptional()
  @Type(() => DatesParseDto)
  dates?: DatesParseDto[];
}
