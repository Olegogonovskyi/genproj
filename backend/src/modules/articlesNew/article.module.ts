import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from './guards/RolesGuard';

@Module({
  imports: [FileStorageModule, AuthModule],
  controllers: [ArticleController],
  providers: [ArticleService, RolesGuard],
  exports: [ArticleService, RolesGuard],
})
export class ArticleModule {}
