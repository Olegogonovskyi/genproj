import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

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
  @IsArray()
  familyAsParent?: string[];

  @IsOptional()
  @IsArray()
  familyAsChild?: string[];

  @IsOptional()
  @IsString()
  dates?: string[];
}
