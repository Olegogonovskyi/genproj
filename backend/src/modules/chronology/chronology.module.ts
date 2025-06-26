import { forwardRef, Module } from '@nestjs/common';
import { ChronologyService } from './services/chronology.service';
import { ChronologyController } from './chronology.controller';
import { ChronologyAdminController } from './chronologyAdmin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ArticleModule } from '../articlesNew/article.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule,
    forwardRef(() => ArticleModule),
    AuthModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [ChronologyController, ChronologyAdminController],
  providers: [ChronologyService],
})
export class ChronologyModule {}
