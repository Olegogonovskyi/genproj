import { Module } from '@nestjs/common';
import { GedcomService } from './gedparse.service';
import { GedcomController } from './gedparse.controller';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { GedParser } from './services/gedParser';
import { BuildFamilyAndPersonService } from './services/buildFamilyAndPerson.service';
import { ParseCustomDate } from '../../helpers/transform/parseCustomDate';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [FileStorageModule, RepositoryModule],
  controllers: [GedcomController],
  providers: [
    GedcomService,
    GedParser,
    BuildFamilyAndPersonService,
    ParseCustomDate,
  ],
})
export class GedparseModule {}
