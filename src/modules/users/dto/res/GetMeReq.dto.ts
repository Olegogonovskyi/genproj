import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseUserReqDto } from '../baseUserReq.dto';

export class GetMeReq extends PickType(BaseUserReqDto, ['id', 'email']) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
