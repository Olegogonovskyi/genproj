import {forwardRef, Module} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [FileStorageModule, forwardRef(() => UsersModule), AuthModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
