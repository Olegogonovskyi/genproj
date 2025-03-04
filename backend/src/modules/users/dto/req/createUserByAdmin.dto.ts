import { PickType } from '@nestjs/swagger';

import { IsEnum, IsOptional } from 'class-validator';
import { RoleEnum } from '../../../../database/enums/role.enum';
import { BaseUserReqDto } from '../baseUserReq.dto';

export class CreateUserByAdminDto extends PickType(BaseUserReqDto, [
  'name',
  'email',
  'password',
  'role',
]) {
  @IsEnum(RoleEnum)
  @IsOptional()
  role?: RoleEnum;
}
