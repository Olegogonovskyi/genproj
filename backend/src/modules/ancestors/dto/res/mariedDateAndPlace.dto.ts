import { IsOptional, IsString } from 'class-validator';

export class MariedDateAndPlaceDto {
  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  Place?: string;
}
