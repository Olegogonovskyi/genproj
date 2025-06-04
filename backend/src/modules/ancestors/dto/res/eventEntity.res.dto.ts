import { IsDate, IsOptional, IsString } from 'class-validator';
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
  @IsDate()
  @Type(() => Date)
  date?: Date;

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
