import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { TransformHelper } from '../../../../helpers/transformHelper';

export class UpdateTagDto {
  @ApiProperty({ type: String })
  @IsString()
  @Length(0, 15)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name: string;
}
