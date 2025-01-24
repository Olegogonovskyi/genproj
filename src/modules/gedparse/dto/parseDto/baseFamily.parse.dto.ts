import { IsArray, IsOptional, IsString } from 'class-validator';

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
  @IsArray()
  parents?: string[];

  @IsOptional()
  children?: string[];

  @IsOptional()
  @IsString()
  date?: string;
}
