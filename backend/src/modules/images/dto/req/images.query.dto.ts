import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from 'src/helpers/transformHelper';

export class ImagesQueryDto {
  @Type(() => Number)
  @IsInt()
  @Max(100)
  @Min(1)
  @IsOptional()
  limitUrls: number = 10;

  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @IsString()
  @IsOptional()
  fotoUrl?: string;

  @IsString()
  @IsOptional()
  contineToken?: string;
}
