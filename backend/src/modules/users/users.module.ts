import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersAdminController } from './usersAdmin.controller';
import { RedisModule } from '../redis/redis.module';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { DeleteCreateTokens } from 'src/helpers/delete.create.tokens';
import { AuthCacheService } from '../auth/services/auth.catch.service';
import { EmailModule } from '../emailodule/emailodule.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '../auth/services/tokenService';
import { ArticleModule } from '../articlesNew/article.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    RedisModule,
    FileStorageModule,
    EmailModule,
    JwtModule,
    ArticleModule,
    AuthModule,
  ],
  controllers: [UsersController, UsersAdminController],
  providers: [UsersService, DeleteCreateTokens, AuthCacheService, TokenService],
})
export class UsersModule {}
