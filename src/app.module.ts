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
    UsersModule,
    RedisModule,
    EmailModule,
  ],
})
export class AppModule {}
