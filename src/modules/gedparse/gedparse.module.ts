import { Module } from '@nestjs/common';
import { GedcomService } from './gedparse.service';
import { GedcomController } from './gedparse.controller';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { GedParser } from './services/gedParser';

@Module({
  imports: [FileStorageModule],
  controllers: [GedcomController],
  providers: [GedcomService, GedParser],
})
export class GedparseModule {}
