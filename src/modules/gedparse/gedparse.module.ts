import { Module } from '@nestjs/common';
import { GedcomService } from './gedparse.service';
import { GedcomController } from './gedparse.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { GedParser } from '../../helpers/gedParser';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    FileStorageModule,
  ],
  controllers: [GedcomController],
  providers: [GedcomService, GedParser],
})
export class GedparseModule {}
