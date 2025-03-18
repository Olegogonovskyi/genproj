import { IsOptional, IsString } from 'class-validator';
import { SinglePersonResDto } from './singlePerson.res.dto';
import { MariedDateAndPlaceDto } from './mariedDateAndPlace.dto';
import { Type } from 'class-transformer';

export class FamilyResDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsOptional()
  insideId?: string;

  @Type(() => SinglePersonResDto)
  @IsOptional()
  parents?: SinglePersonResDto[];

  @Type(() => SinglePersonResDto)
  @IsOptional()
  children?: SinglePersonResDto[];

  @IsOptional()
  dateOfMarry?: MariedDateAndPlaceDto;
}
