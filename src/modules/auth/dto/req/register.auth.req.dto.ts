import { PickType } from '@nestjs/swagger';
import { BaseUserReqDto } from '../../../users/dto/baseUserReq.dto';

export class RegisterAuthReqDto extends PickType(BaseUserReqDto, [
  'name',
  'email',
  'password',
  'deviceId',
]) {}
