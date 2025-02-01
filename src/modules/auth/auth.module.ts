import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';
import { EmailModule } from '../emailodule/emailodule.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessGuard } from './quards/jwtAccesGuard';
import { AuthCacheService } from './services/auth.catch.service';
import { DeleteCreateTokens } from 'src/helpers/delete.create.tokens';
import { TokenService } from './services/tokenService';

@Module({
  imports: [JwtModule, UsersModule, RedisModule, EmailModule],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAccessGuard,
    },
    AuthService,
    TokenService,
    AuthCacheService,
    DeleteCreateTokens,
  ],
})
export class AuthModule {}
