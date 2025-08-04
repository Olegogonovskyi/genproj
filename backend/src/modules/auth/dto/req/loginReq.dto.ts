import { PickType } from '@nestjs/swagger';
import { BaseUserReqDto } from 'src/modules/users/dto/baseUserReq.dto';

export class LoginReqDto extends PickType(BaseUserReqDto, [
  'email',
  'password',
  'deviceId',
]) {}
