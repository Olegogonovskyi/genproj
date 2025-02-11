import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ControllerEnum } from '../../enums/controllerEnum';

@ApiTags(ControllerEnum.USERS)
@Controller(ControllerEnum.USERS)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  getString() {
    return 'All is ok';
  }
}
