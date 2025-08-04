import { IsOptional, IsString } from 'class-validator';
import { EventResDto } from './event.res.dto';

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

  @IsOptional()
  birthDateandPlace?: EventResDto;

  @IsOptional()
  deathDateandPlace?: EventResDto;
}
