import { PickType } from '@nestjs/swagger';
import { BaseUserReqDto } from 'src/modules/users/dto/baseUserReq.dto';

export class ReqAfterGuardDto extends PickType(BaseUserReqDto, [
  'id',
  'email',
  'deviceId',
  'role',
  'isVerified',
]) {}
