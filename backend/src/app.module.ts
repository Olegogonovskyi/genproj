import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { GedparseModule } from './modules/gedparse/gedparse.module';
import { FileStorageModule } from './modules/filestorage/filestorageModule';
import { RepositoryModule } from './modules/repository/repository.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { UsersModule } from './modules/users/users.module';
import { EmailModule } from './modules/emailodule/emailodule.module';
import { AuthModule } from './modules/auth/auth.module';
import { TagModule } from './modules/tag/tag.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ChronologyModule } from './modules/chronology/chronology.module';
import { AncestorsModule } from './modules/ancestors/ancestors.module';
import { ArticleModule } from './modules/articlesNew/article.module';
import { ImagesModule } from './modules/images/images.module';
import {OpenAiModule} from "./modules/open-ai/open-ai.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    GedparseModule,
    FileStorageModule,
    RepositoryModule,
    PostgresModule,
    AuthModule,
    RedisModule,
    EmailModule,
    ArticleModule,
    TagModule,
    UsersModule,
    ChronologyModule,
    AncestorsModule,
    ImagesModule,
    EventEmitterModule.forRoot(),
    OpenAiModule,
  ],
})
export class AppModule {}
