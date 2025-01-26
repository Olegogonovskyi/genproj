import { Global, Module } from '@nestjs/common';
import { EventRepository } from './services/event.repository';
import { FamilyRepository } from './services/family.repository';
import { IndividualRepository } from './services/person.repository';

const repositories = [EventRepository, FamilyRepository, IndividualRepository];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
