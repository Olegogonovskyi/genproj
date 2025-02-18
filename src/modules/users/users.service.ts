import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserByAdminDto } from './dto/req/createUserByAdmin.dto';
import { UsersEntity } from '../../database/entities/users.entity';
import { UserRepository } from '../repository/services/users.repository';
import { AuthCacheService } from '../auth/services/auth.catch.service';
import { EmailService } from '../emailodule/emailodule.service';
import { FileStorageService } from '../filestorage/filestorageService';
import { TokenService } from '../auth/services/tokenService';
import { EmailEnum } from '../emailodule/enums/emailEnam';
import { UpdateUserByAdminDto } from './dto/req/updateUserByAdmin.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly fileStorageService: FileStorageService,
    private readonly emailService: EmailService,
    private readonly tokenService: TokenService,
  ) {}

  public async create(
    CreateUserByAdminDto: CreateUserByAdminDto,
  ): Promise<UsersEntity> {
    const password = bcrypt.hashSync(CreateUserByAdminDto.password, 10);
    const isExistUser = await this.userRepository.findOneBy({
      email: CreateUserByAdminDto.email,
    });
    if (isExistUser) {
      throw new ConflictException({
        message: `Email already exists: ${isExistUser.email}`,
        errorCode: 'USER_EXISTS',
      });
    }
    const user = await this.userRepository.save(
      this.userRepository.create({ ...CreateUserByAdminDto, password }),
    );
    const verToken = await this.tokenService.genreVerifToken({
      userId: user.id,
    });
    console.log(process.env);

    await this.emailService.sendEmail(EmailEnum.WELCOME, user.email, {
      layout: 'main',
      name: user.name,
      frontUrl: process.env.FRONTEND_URL,
      actionToken: verToken,
    });
    return user;
  }

  public async findMe(id: string): Promise<UsersEntity> {
    return await this.userRepository.findOneBy({ id: id });
  }

  public async updateUserbyAdmin(dto: UpdateUserByAdminDto, id: string) {
    const user = await this.updateUser(dto, id);
    await this.authCacheService.deleteByIdKey(id); // Invalidate cache
    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    try {
      await Promise.all([
        this.userRepository.delete({ id: userId }),
        this.authCacheService.deleteByIdKey(userId),
      ]);
    } catch (e) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }

  private async updateUser(
    updateUserDto: Partial<UsersEntity>,
    userId: string,
  ): Promise<UsersEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }
}
