import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { AuthModule } from '../auth/auth.module';
import { ArticleModule } from '../articlesNew/article.module';
import {FileStorageModule} from "../filestorage/filestorageModule";

@Module({
  imports: [AuthModule, ArticleModule, FileStorageModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
