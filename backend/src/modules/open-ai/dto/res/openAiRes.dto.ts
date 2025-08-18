import { IsOptional, IsString } from 'class-validator';

export class OpenAiResDto {
  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  ruler?: string;

  @IsString()
  @IsOptional()
  worldSituation?: string;
}
