import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserByAdminDto } from './dto/req/createUserByAdmin.dto';
import { ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';

@ApiTags(ControllerEnum.USERS)
@Controller(ControllerEnum.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserByAdminDto) {
    return this.usersService.create(dto);
  }
}
