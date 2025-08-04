import { IsOptional, IsString, IsUUID } from 'class-validator';

export class BaseImageReqDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  name: string;
}
