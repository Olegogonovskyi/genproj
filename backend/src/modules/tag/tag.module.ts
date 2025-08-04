import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { JwtModule } from '@nestjs/jwt';
import { ArticleModule } from '../articlesNew/article.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [JwtModule, ArticleModule, AuthModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
