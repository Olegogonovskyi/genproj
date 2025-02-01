import { Injectable } from '@nestjs/common';
import { CreateUserByAdminDto } from './dto/req/createUserByAdmin.dto';

@Injectable()
export class UsersService {
  create(dto: CreateUserByAdminDto) {
    return `This action adds a new user ${dto}`;
  }
}
