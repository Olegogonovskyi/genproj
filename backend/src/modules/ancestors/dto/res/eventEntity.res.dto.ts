import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FamilyResDto } from './family.res.dto';
import { SinglePersonResDto } from './singlePerson.res.dto';

export class EventEntityResDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  place: string;

  @Type(() => FamilyResDto)
  @IsOptional()
  familyPersons?: FamilyResDto[];

  @Type(() => SinglePersonResDto)
  @IsOptional()
  personEvent: SinglePersonResDto[];
}
