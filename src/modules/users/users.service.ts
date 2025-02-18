import { Injectable } from '@nestjs/common';
import { CreateUserByAdminDto } from './dto/req/createUserByAdmin.dto';
import { UsersEntity } from '../../database/entities/users.entity';
import { UserRepository } from '../repository/services/users.repository';

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

  public async updateUserbyAdmin(dto: UpdateUserByAdminDto, id: string) {
    const user = await this.updateUser(dto, id);
    await this.authCacheService.deleteByIdKey(id); // Invalidate cache
    return user;
  }

  create(dto: CreateUserByAdminDto) {
    return `This action adds a new user ${dto}`;
  }
}
