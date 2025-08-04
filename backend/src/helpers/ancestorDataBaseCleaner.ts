import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      switch (repo) {
        case AncestorsEntityEnum.PERSON: {
          const relations = ['familyAsParent', 'familyAsChild', 'events'];
          const persons = await this.personRepository.find({
            relations: relations,
          });
          await this.relationsDel(persons, relations, PersonEntity);
          await this.personRepository.createQueryBuilder().delete().execute();
          break;
        }

        case AncestorsEntityEnum.EVENTS: {
          const relations = ['family', 'persons'];
          const events = await this.eventRepository.find({ relations });
          await this.relationsDel(events, relations, EventsEntity);
          await this.eventRepository.createQueryBuilder().delete().execute();
          break;
        }

        case AncestorsEntityEnum.FAMILY: {
          const relations = ['events', 'parents', 'children'];
          const families = await this.familyRepository.find({ relations });
          await this.relationsDel(families, relations, FamilyEntity);
          await this.familyRepository.createQueryBuilder().delete().execute();
          break;
        }

        default:
          throw new BadRequestException('Невідомий тип сутності для очищення');
      }
    } catch (error) {
      console.error(`Помилка при очищенні ентіті [${repo}]:`, error);
      throw new InternalServerErrorException(`Помилка при очищенні: ${repo}`);
    }
  }

  private async relationsDel<T>(
    entities: T[],
    relations: string[],
    entityType: ObjectType<T>,
  ): Promise<void> {
    const repository = this.getRepositoryForEntity(entityType);

    for (const entity of entities) {
      for (const relation of relations) {
        const relatedEntities = entity[relation];
        if (relatedEntities?.length) {
          await repository
            .createQueryBuilder()
            .relation(entityType, relation)
            .of(entity)
            .remove(relatedEntities);
        }
      }
    }
  }

  private getRepositoryForEntity<T>(entityType: ObjectType<T>) {
    if (entityType === PersonEntity) return this.personRepository;
    if (entityType === EventsEntity) return this.eventRepository;
    if (entityType === FamilyEntity) return this.familyRepository;
    throw new Error(`Repository not found for entity type`);
  }
}
