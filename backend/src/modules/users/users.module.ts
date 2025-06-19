import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersAdminController } from './usersAdmin.controller';
import { RedisModule } from '../redis/redis.module';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { APP_GUARD } from '@nestjs/core';
import { DeleteCreateTokens } from 'src/helpers/delete.create.tokens';
import { AuthCacheService } from '../auth/services/auth.catch.service';
import { EmailModule } from '../emailodule/emailodule.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/RolesGuard';
import { TokenService } from '../auth/services/tokenService';
import { ArticleModule } from '../articlesNew/article.module';

@Module({
  imports: [
    RedisModule,
    FileStorageModule,
    EmailModule,
    JwtModule,
    ArticleModule,
  ],
  controllers: [UsersController, UsersAdminController],
  providers: [
    UsersService,
    DeleteCreateTokens,
    AuthCacheService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    TokenService,
  ],
})
export class UsersModule {}
