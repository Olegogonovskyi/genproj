import { PickType } from '@nestjs/swagger';
import { BaseUserReqDto } from 'src/modules/users/dto/baseUserReq.dto';

export class RegisterAuthResDto extends PickType(BaseUserReqDto, [
  'id',
  'name',
  'email',
  'role',
  'isVerified',
  'authMethod',
  'deviceId'
]) {}
