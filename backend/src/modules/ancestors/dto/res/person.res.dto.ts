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
  worldSituation?: string;

  @IsOptional()
  @IsString()
  object?: string;

  @Exclude()
  @Type(() => FamilyResDto)
  @IsOptional()
  familyAsParent?: FamilyResDto[] | null;

  @Exclude()
  @Type(() => FamilyResDto)
  @IsOptional()
  familyAsChild?: FamilyResDto[] | null;

  @IsOptional()
  @IsString()
  birthDateandPlace?: EventResDto | null;

  @IsOptional()
  @IsString()
  deathDateandPlace?: EventResDto | null;
}
