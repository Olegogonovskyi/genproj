import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { BaseDatesParseDto } from './baseDates.parse.dto';
import { Type } from 'class-transformer';
import { BaseFamilyParseDto } from './baseFamily.parse.dto';

export class BaseIndividualParseDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  uid?: string;

  @IsOptional()
  @IsString()
  updatedmh?: string;

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
  familyAsParent?: BaseFamilyParseDto[];

  @IsOptional()
  familyAsChild?: BaseFamilyParseDto[];

  @IsOptional()
  @Type(() => BaseDatesParseDto)
  dates?: BaseDatesParseDto[];
}
