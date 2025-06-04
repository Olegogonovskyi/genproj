import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class EventResDto {
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsOptional()
  @IsString()
  place: string;
}
