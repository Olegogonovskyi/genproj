import { PickType } from '@nestjs/swagger';
import { BaseUserReqDto } from '../baseUserReq.dto';

export class CreateUserAdminResDto extends PickType(BaseUserReqDto, [
  'id',
  'name',
  'email',
  'role',
]) {}
