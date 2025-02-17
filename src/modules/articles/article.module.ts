import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../users/guards/RolesGuard';

@Module({
  imports: [FileStorageModule],
  controllers: [ArticleController],
  providers: [
    ArticleService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [ArticleService],
})
export class ArticleModule {}
