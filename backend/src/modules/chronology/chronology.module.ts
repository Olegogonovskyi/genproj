import { Module } from '@nestjs/common';
import { ChronologyService } from './services/chronology.service';
import { ChronologyController } from './chronology.controller';
import { ChronologyAdminController } from './chronologyAdmin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ArticleModule } from '../articlesNew/article.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [JwtModule, ArticleModule, AuthModule],
  controllers: [ChronologyController, ChronologyAdminController],
  providers: [ChronologyService],
})
export class ChronologyModule {}
