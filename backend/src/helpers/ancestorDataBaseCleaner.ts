import { BadRequestException, Injectable } from '@nestjs/common';
import { PersonRepository } from '../modules/repository/services/person.repository';
import { EventRepository } from '../modules/repository/services/event.repository';
import { FamilyRepository } from '../modules/repository/services/family.repository';
import { AncestorsEntityEnum } from '../enums/ancestorsEntityEnum';
import { PersonEntity } from '../database/entities/person.entity';
import { EventsEntity } from '../database/entities/events.entity';
import { FamilyEntity } from '../database/entities/family.entity';
import { ObjectType } from 'typeorm';

@Injectable()
export class AncestorDataBaseCleaner {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly eventRepository: EventRepository,
    private readonly familyRepository: FamilyRepository,
  ) {}

  public async clearAll(repo: AncestorsEntityEnum): Promise<void> {
    switch (repo) {
      case AncestorsEntityEnum.PERSON: {
        const relations = ['familyAsParent', 'familyAsChild', 'events'];
        const persons = await this.personRepository.find({
          relations: relations,
        });
        await this.relationsDel<PersonEntity>(persons, relations, PersonEntity);
        await this.personRepository.clear();
        break;
      }

      case AncestorsEntityEnum.EVENTS: {
        const relations = ['family', 'persons'];
        const events = await this.eventRepository.find({ relations });
        await this.relationsDel<EventsEntity>(events, relations, EventsEntity);
        await this.eventRepository.clear();
        break;
      }

      case AncestorsEntityEnum.FAMILY: {
        const relations = ['events', 'parents', 'children'];
        const families = await this.familyRepository.find({ relations });
        await this.relationsDel<FamilyEntity>(
          families,
          relations,
          FamilyEntity,
        );
        await this.familyRepository.clear();
        break;
      }

      default:
        throw new BadRequestException('Невідомий тип сутності для очищення');
    }
  }

  private async relationsDel<T extends ObjectType<any>>(
    entities: T[],
    relations: string[],
    entityType: T,
  ): Promise<void> {
    for (const entity of entities) {
      for (const relation of relations) {
        const relatedEntities = entity[relation];
        if (relatedEntities?.length) {
          await this.personRepository
            .createQueryBuilder()
            .relation(entityType, relation)
            .of(entity)
            .remove(relatedEntities);
        }
      }
    }
  }
}
