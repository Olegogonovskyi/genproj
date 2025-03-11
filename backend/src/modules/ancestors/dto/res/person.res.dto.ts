import { Exclude, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { FamilyResDto } from './family.res.dto';
import { EventResDto } from './event.res.dto';

export class PersonResDto {
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
  surName?: string;

  @IsOptional()
  @IsString()
  marriedSurName?: string;

  @IsString()
  sex: string;

  @IsBoolean()
  isDead?: boolean;

  @IsOptional()
  @IsString()
  npfx?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  object?: string;

  @Exclude()
  @Type(() => FamilyResDto)
  @IsOptional()
  familyAsParent?: FamilyResDto[];

  @Exclude()
  @Type(() => FamilyResDto)
  @IsOptional()
  familyAsChild: FamilyResDto[];

  @IsOptional()
  @IsString()
  birthDateandPlace: EventResDto;

  @IsOptional()
  @IsString()
  deathDateandPlace: EventResDto;
}
