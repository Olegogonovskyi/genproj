import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserRepository } from '../../repository/services/users.repository';
import { AuthCacheService } from '../services/auth.catch.service';
import { TokenService } from '../services/tokenService';
import { Config, JwtConfig } from '../../../config/config.types';
import { TokenTypeEnum } from '../enums/tokenTypeEnum';
import { JwtPayload } from '../../../models/jwtPayload';
import { UserMapper } from '../mapers/userMapper';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<Config>,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.accessSecret,
      passReqToCallback: true, // Передаємо запит в метод validate
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    console.log(`accessToken ${accessToken}`);
    if (!accessToken) {
      console.log(`accessToken is empty`);
      throw new UnauthorizedException('Token is lost');
    }

    // Валідація токену
    const isValid = await this.tokenService.verifyToken(
      accessToken,
      TokenTypeEnum.ACCESS,
    );
    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    // Перевірка наявності токену в кеші
    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );
    if (!isAccessTokenExist) {
      throw new UnauthorizedException('Token is missing');
    }

    // Отримання користувача з бази даних
    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    // Повертаємо дані користувача, які будуть доступні в req.user
    return UserMapper.toReqUserData(user, payload);
  }
}
