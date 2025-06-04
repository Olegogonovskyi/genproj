import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class MariedDateAndPlaceDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @IsString()
  Place?: string;
}
