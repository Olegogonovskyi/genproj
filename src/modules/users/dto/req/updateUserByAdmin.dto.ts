import { PartialType, PickType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { RoleEnum } from '../../../../database/enums/role.enum';
import { BaseUserReqDto } from '../baseUserReq.dto';

export class UpdateUserByAdminDto extends PartialType(
  PickType(BaseUserReqDto, ['name', 'role']),
) {
  @IsOptional()
  name?: string;

  @IsEnum(RoleEnum)
  @IsOptional()
  role?: RoleEnum;
}
