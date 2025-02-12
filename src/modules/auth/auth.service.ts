import {
  BadRequestException, HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterAuthReqDto } from './dto/req/register.auth.req.dto';
import { UserRepository } from '../repository/services/users.repository';
import { TokenService } from './services/tokenService';
import { UserMapper } from './mapers/userMapper';
import { AuthResDto } from './dto/res/auth.res.dto';
import { LoginReqDto } from './dto/req/loginReq.dto';
import { ReqAfterGuardDto } from './dto/req/reqAfterGuard.dto';
import { TokenTypeEnum } from './enums/tokenTypeEnum';
import * as process from 'node:process';
import { DeleteCreateTokens } from 'src/helpers/delete.create.tokens';
import { EmailService } from '../emailodule/emailodule.service';
import { EmailEnum } from '../emailodule/enums/emailEnam';
import { handleTokenError } from 'src/common/tokenErr/handleTokenError';
import { TokenPair } from '../../models/tokenPair';
import { JwtService } from '@nestjs/jwt';
import { AuthMethodEnum } from '../../database/enums/AuthMethodEnum';
import { GooglePayload } from '../../models/googlePayload';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly deleteCreateTokens: DeleteCreateTokens,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(
    registerAuthDto: RegisterAuthReqDto,
  ): Promise<AuthResDto> {
    const password = bcrypt.hashSync(registerAuthDto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({
        ...registerAuthDto,
        password,
        authMethod: AuthMethodEnum.EMAIL,
      }),
    );

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: registerAuthDto.deviceId,
    });

    const verToken = await this.tokenService.genreVerifToken({
      userId: user.id,
    });

    try {
      await Promise.all([
        this.userRepository.update(user.id, { verifyToken: verToken }),
        this.deleteCreateTokens.saveNewTokens(
          registerAuthDto.deviceId,
          user.id,
          tokens,
        ),
        this.emailService.sendEmail(EmailEnum.WELCOME, user.email, {
          layout: 'main',
          name: user.name,
          frontUrl: process.env.FRONTEND_URL,
          actionToken: verToken,
        }),
      ]);
    } catch (e) {
      throw new InternalServerErrorException('Registration failed');
    }

    return { user: UserMapper.toResponseDTO(user), tokens: tokens };
  }

  public async login(loginAuthDto: LoginReqDto): Promise<AuthResDto> {
    const user = await this.userRepository.findOne({
      where: { email: loginAuthDto.email },
      select: { id: true, password: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPaswordValid = bcrypt.compareSync(
      loginAuthDto.password,
      user.password,
    );
    if (!isPaswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: loginAuthDto.deviceId,
    });

    await Promise.all([
      this.deleteCreateTokens.deleteTokens(loginAuthDto.deviceId, user.id),
      this.deleteCreateTokens.saveNewTokens(
        loginAuthDto.deviceId,
        user.id,
        tokens,
      ),
    ]);
    return { user: UserMapper.toResponseDTO(user), tokens: tokens };
  }

  public async googleLogin(payload: GooglePayload): Promise<AuthResDto> {
    if (!payload) {
      throw new BadRequestException('Unauthenticated');
    }
    try {
      const { name, email } = payload;
      // Шукаємо існуючого користувача або створюємо нового
      let user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        user = await this.userRepository.save(
          this.userRepository.create({
            email,
            name,
            authMethod: AuthMethodEnum.GOOGLE,
          }),
        );
      }
      // Генеруємо токени (винесено з умовних блоків)
      const tokens = await this.tokenService.generateAuthTokens({
        userId: user.id,
        deviceId: 'deviceID', // Рекомендується передавати реальний deviceId з клієнта
      });
      // Оновлюємо токени в базі
      await this.deleteCreateTokens.saveNewTokens('deviceID', user.id, tokens);
      return {
        user: UserMapper.toResponseDTO(user),
        tokens,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      // 2. Помилки валідації/бази даних
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException('Database operation failed');
      }
      // 3. Всі інші невідомі помилки
      throw new InternalServerErrorException('Authentication failed', {
        cause: error,
        description: 'Google login error',
      });
    }
  }

  public async refresh(userData: ReqAfterGuardDto): Promise<TokenPair> {
    await this.deleteCreateTokens.deleteTokens(userData.deviceId, userData.id);
    const tokens = await this.tokenService.generateAuthTokens({
      userId: userData.id,
      deviceId: userData.deviceId,
    });
    await this.deleteCreateTokens.saveNewTokens(
      userData.deviceId,
      userData.id,
      tokens,
    );
    return tokens;
  }

  public async verifyUser(verToken: string): Promise<string> {
    try {
      const payload = await this.tokenService.verifyToken(
        verToken,
        TokenTypeEnum.VERIFY,
      );
      const userToVer = await this.userRepository.findOneBy({
        id: payload.userId,
      });
      if (!userToVer) {
        throw new NotFoundException('User not found');
      }
      userToVer.isVerified = true;
      await this.userRepository.update(userToVer.id, { isVerified: true });
      return 'User successfully verified';
    } catch (e) {
      handleTokenError(e);
    }
  }

  public async logout(userData: ReqAfterGuardDto): Promise<void> {
    await this.deleteCreateTokens.deleteTokens(userData.deviceId, userData.id);
  }
}
