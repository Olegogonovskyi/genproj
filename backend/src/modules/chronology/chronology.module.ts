import { Module } from '@nestjs/common';
import { ChronologyService } from './services/chronology.service';
import { ChronologyController } from './chronology.controller';
import { ChronologyAdminController } from './chronologyAdmin.controller';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../users/guards/RolesGuard';
import { ArticleModule } from '../articlesNew/article.module';

@Module({
  imports: [JwtModule, ArticleModule],
  controllers: [ChronologyController, ChronologyAdminController],
  providers: [
    ChronologyService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ChronologyModule {}
