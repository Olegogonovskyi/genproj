import { Global, Module } from '@nestjs/common';
import { DateRepository } from './services/date.repository';
import { FamilyRepository } from './services/family.repository';
import { IndividualRepository } from './services/individual.repository';

const repositories = [DateRepository, FamilyRepository, IndividualRepository];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
