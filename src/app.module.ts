import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { GedparseModule } from './modules/gedparse/gedparse.module';
import { FileStorageModule } from './modules/filestorage/filestorageModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    GedparseModule,
    FileStorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
