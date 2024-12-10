import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { GedparseModule } from './modules/gedparse/gedparse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    GedparseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
