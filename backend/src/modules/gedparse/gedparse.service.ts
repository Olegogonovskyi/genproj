import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GedParser } from './services/gedParser';
import { FamilyAndPersonService } from './services/FamilyAndPerson.service';
import { GedcomRecordType } from '../../helpers/types/GedcomRecord.Type';
import { PersonRepository } from '../repository/services/person.repository';
import { EventRepository } from '../repository/services/event.repository';
import { FamilyRepository } from '../repository/services/family.repository';
import { ChronologyRepository } from '../repository/services/chronology.repository';

@Injectable()
export class GedcomService {
  constructor(
    private readonly gedParser: GedParser,
    private readonly familyAndPersonService: FamilyAndPersonService,
    private readonly personRepository: PersonRepository,
    private readonly eventRepository: EventRepository,
    private readonly familyRepository: FamilyRepository,
    private readonly chronologyRepository: ChronologyRepository,
  ) {}

  public async parseGedcom(fileContent: any): Promise<GedcomRecordType[]> {
    const parcedFile = await this.gedParser.parse(fileContent);
    await this.familyAndPersonService.builder(parcedFile);
    return parcedFile;
  }
  public async clearAllAncestors(): Promise<void> {
    try {
      await this.personRepository.clearAll();
      await this.eventRepository.clearAll();
      await this.familyRepository.clearAll();
    } catch (error) {
      console.error('Помилка при очищенні бази даних:', error);
      throw new InternalServerErrorException('Помилка при очищенні бази даних');
    }
  }
}
