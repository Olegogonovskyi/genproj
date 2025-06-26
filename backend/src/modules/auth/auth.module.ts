import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';
import { EmailModule } from '../emailodule/emailodule.module';
import { JwtAccessGuard } from './quards/jwtAccesGuard';
import { AuthCacheService } from './services/auth.catch.service';
import { DeleteCreateTokens } from 'src/helpers/delete.create.tokens';
import { TokenService } from './services/tokenService';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from './stategy/jwt-access.strategy';
import { GoogleStrategy } from './stategy/google.strategy';

@Module({
  imports: [
    JwtModule,
    forwardRef(() => UsersModule),
    RedisModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    AuthCacheService,
    DeleteCreateTokens,
    JwtAccessStrategy,
    GoogleStrategy,
    JwtAccessGuard,
  ],
  exports: [PassportModule, JwtAccessGuard, AuthService],
})
export class AuthModule {}
