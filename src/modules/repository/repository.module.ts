import { Global, Module } from '@nestjs/common';
import { EventRepository } from './services/event.repository';
import { FamilyRepository } from './services/family.repository';
import { PersonRepository } from './services/person.repository';
import { RefreshTokenRepository } from './services/refreshToken.repository';
import { UserRepository } from './services/users.repository';

const repositories = [
  EventRepository,
  FamilyRepository,
  PersonRepository,
  RefreshTokenRepository,
  UserRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
