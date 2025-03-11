import { IsOptional, IsString } from 'class-validator';

export class SinglePersonResDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  insideId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  marriedSurName?: string;

  @IsOptional()
  @IsString()
  surName?: string;
}
