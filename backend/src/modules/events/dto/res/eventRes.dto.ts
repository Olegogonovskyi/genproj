import { IsArray, IsOptional, IsString } from 'class-validator';
import { SinglePersonResDto } from '../../../ancestors/dto/res/singlePerson.res.dto';

export class EventResDto {
  @IsString()
  id: string;

  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  place?: string;

  @IsArray()
  persons: SinglePersonResDto[];
}
