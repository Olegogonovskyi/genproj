import { IsOptional, IsString } from 'class-validator';

export class EventResDto {
  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  place: string;
}
