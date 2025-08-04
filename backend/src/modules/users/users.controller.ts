import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';
import { ReqAfterGuardDto } from '../auth/dto/req/reqAfterGuard.dto';
import { CurrentUser } from '../auth/decorators/currentUserDecorator';
import { UserMapper } from '../auth/mapers/userMapper';
import { RegisterAuthResDto } from '../auth/dto/res/register.auth.res.dto';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';

@ApiTags(ControllerEnum.USERS)
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller(ControllerEnum.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: `Find me`,
  })
  @Get('me')
  public async findMe(
    @CurrentUser() userData: ReqAfterGuardDto,
  ): Promise<RegisterAuthResDto> {
    const result = await this.usersService.findMe(userData.id);
    return UserMapper.toResponseDTO(result);
  }

  @ApiOperation({
    summary: `Remove me`,
  })
  @Delete('me')
  public async deleteMe(
    @CurrentUser() userData: ReqAfterGuardDto,
  ): Promise<void> {
    await this.usersService.deleteUser(userData.id);
  }
}
