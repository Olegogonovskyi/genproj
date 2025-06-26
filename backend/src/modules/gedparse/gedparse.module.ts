import {  Module } from '@nestjs/common';
import { GedcomService } from './gedparse.service';
import { GedcomController } from './gedparse.controller';
import { FileStorageModule } from '../filestorage/filestorageModule';
import { GedParser } from './services/gedParser';
import { RepositoryModule } from '../repository/repository.module';
import { FamilyAndPersonService } from './services/FamilyAndPerson.service';
import { CleanfromHTMLandCSS } from '../../helpers/cleanfromHTMLandCSS/cleanfromHTMLandCSS';
import { ParseCustomDateOne } from '../../helpers/transform/parseCustomDateOne';
import { AncestorDataBaseCleaner } from '../../helpers/ancestorDataBaseCleaner';
import { ArticleModule } from '../articlesNew/article.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    FileStorageModule,
    RepositoryModule,
    ArticleModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [GedcomController],
  providers: [
    GedcomService,
    GedParser,
    FamilyAndPersonService,
    ParseCustomDateOne,
    CleanfromHTMLandCSS,
    AncestorDataBaseCleaner,
  ],
})
export class GedparseModule {}
