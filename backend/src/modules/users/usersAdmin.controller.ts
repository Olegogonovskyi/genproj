import {
  Controller,
  Post,
  Body,
  Delete,
  ParseUUIDPipe,
  Param,
  Patch,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ControllerEnum } from 'src/enums/controllerEnum';
import { CreateUserByAdminDto } from './dto/req/createUserByAdmin.dto';
import { RoleEnum } from 'src/database/enums/role.enum';
import { RolesGuard } from './guards/RolesGuard';
import { UserMapper } from '../auth/mapers/userMapper';
import { RegisterAuthResDto } from '../auth/dto/res/register.auth.res.dto';
import { Roles } from './decorators/roleDecorator';
import { UpdateUserByAdminDto } from './dto/req/updateUserByAdmin.dto';
import { UsersQueryDto } from './dto/req/users.query.dto';
import { UsersListResDto } from './dto/res/usersListRes.dto';
import { JwtAccessGuard } from '../auth/quards/jwtAccesGuard';

@ApiTags(ControllerEnum.ADMINUSERS)
@ApiBearerAuth()
@UseGuards(JwtAccessGuard)
@Controller(ControllerEnum.ADMINUSERS)
export class UsersAdminController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: `Create user with role *only for ${RoleEnum.ADMIN}*`,
  })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
  })
  @ApiBody({ type: CreateUserByAdminDto })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Post('create')
  public async create(
    @Body() CreateUserByAdminDto: CreateUserByAdminDto,
  ): Promise<RegisterAuthResDto> {
    const result = await this.usersService.create(CreateUserByAdminDto);
    return UserMapper.toResponseDTO(result);
  }

  @ApiOperation({ summary: 'Find a user' })
  @Get(':userId')
  public async getById(
    @Param('userId') userId: string,
  ): Promise<RegisterAuthResDto> {
    const result = await this.usersService.getById(userId);
    return UserMapper.toResponseDTO(result);
  }

  @ApiOperation({
    summary: `Remove user *only for ${RoleEnum.ADMIN}*`,
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':userId')
  public async deleteUser(
    @Param('userId', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.usersService.deleteUser(id);
  }

  @ApiOperation({
    summary: `Update user *only for ${RoleEnum.ADMIN}*`,
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':userId')
  public async updateUserbyAdmin(
    @Body() updateUserDto: UpdateUserByAdminDto,
    @Param('userId', ParseUUIDPipe) id: string,
  ): Promise<RegisterAuthResDto> {
    const result = await this.usersService.updateUserbyAdmin(updateUserDto, id);
    return UserMapper.toResponseDTO(result);
  }

  @ApiOperation({
    summary: `Get list of users *only for ${RoleEnum.ADMIN}*`,
  })
  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  public async getListofUsers(
    @Query() query: UsersQueryDto,
  ): Promise<UsersListResDto> {
    const [entities, number] = await this.usersService.getListofUsers(query);
    return UserMapper.toResListDto(entities, number, query);
  }
}
