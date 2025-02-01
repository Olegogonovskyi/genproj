import { PartialType, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BaseUserReqDto } from '../baseUserReq.dto';

export class UpdateMeDto extends PartialType(
  PickType(BaseUserReqDto, ['name']),
) {
  @IsOptional()
  name?: string;
}
