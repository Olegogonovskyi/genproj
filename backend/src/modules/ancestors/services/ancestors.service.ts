import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PersonRepository } from '../../repository/services/person.repository';
import { PersonEntity } from '../../../database/entities/person.entity';
import { PersonsQueryDto } from '../dto/req/personsQuery.dto';
import { FamilyEntity } from '../../../database/entities/family.entity';
import { FamilyRepository } from '../../repository/services/family.repository';
import { EventsQueryDto } from '../dto/req/eventsQuery.dto';
import { EventsEntity } from '../../../database/entities/events.entity';
import { EventRepository } from '../../repository/services/event.repository';

@Injectable()
export class AncestorsService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly familyRepository: FamilyRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  public async getById(id: string): Promise<PersonEntity> {
    try {
      const ancestor = await this.personRepository.getPerson(id);
      if (!ancestor) {
        throw new NotFoundException(`ancestor with ID ${id} not found`);
      }
      return ancestor;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find ancestor by Id');
    }
  }

  public async getByEventId(id: string): Promise<EventsEntity> {
    try {
      const event = await this.eventRepository.getOne(id);
      if (!event) {
        throw new NotFoundException(`event with ID ${id} not found`);
      }
      return event;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find ancestor by Id');
    }
  }

  public async getAllAncestors(
    query: PersonsQueryDto,
  ): Promise<[PersonEntity[], number]> {
    try {
      return await this.personRepository.getAll(query);
    } catch (error) {
      throw new InternalServerErrorException('Failed to find ancestors');
    }
  }

  public async getAllEvents(
    query: EventsQueryDto,
  ): Promise<[EventsEntity[], number]> {
    try {
      return await this.eventRepository.getAll(query);
    } catch (error) {
      throw new InternalServerErrorException('Failed to find event');
    }
  }

  public async getAllFamilies(
    query: PersonsQueryDto,
  ): Promise<[FamilyEntity[], number]> {
    try {
      const [familyes, numberOfEntities] =
        await this.familyRepository.getAll(query);
      return [familyes, numberOfEntities];
    } catch (error) {
      throw new InternalServerErrorException('Failed to find families');
    }
  }

  public async getFamilyById(familyId: string): Promise<FamilyEntity> {
    try {
      const familyFromBase =
        await this.familyRepository.getFamilyById(familyId);
      if (!familyFromBase) {
        throw new NotFoundException(
          `family with ID ${familyFromBase} not found`,
        );
      }
      return familyFromBase;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to find family by Id');
    }
  }
}
