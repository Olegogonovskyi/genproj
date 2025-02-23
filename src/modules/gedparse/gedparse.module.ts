import { Module } from '@nestjs/common';
import { GedcomService } from './gedparse.service';
import { GedcomController } from './gedparse.controller';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { GedParser } from './services/gedParser';
import { ParseCustomDate } from '../../helpers/transform/parseCustomDate';
import { RepositoryModule } from '../repository/repository.module';
import { FamilyAndPersonService } from './services/FamilyAndPerson.service';
import { CleanfromHTMLandCSS } from '../../helpers/cleanfromHTMLandCSS/cleanfromHTMLandCSS';

@Module({
  imports: [FileStorageModule, RepositoryModule],
  controllers: [GedcomController],
  providers: [
    GedcomService,
    GedParser,
    FamilyAndPersonService,
    ParseCustomDate,
    CleanfromHTMLandCSS
  ],
})
export class GedparseModule {}
