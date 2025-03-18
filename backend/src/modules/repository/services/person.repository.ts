import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PersonEntity } from '../../../database/entities/person.entity';
import { PersonsQueryDto } from '../../ancestors/dto/req/personsQuery.dto';

@Injectable()
export class PersonRepository extends Repository<PersonEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PersonEntity, dataSource.manager);
  }
  public async getPerson(id: string): Promise<PersonEntity> {
    const qb = this.createQueryBuilder('person');

    // Основні зв'язки для PersonEntity
    qb.leftJoinAndSelect('person.familyAsParent', 'familyAsParent');
    qb.leftJoinAndSelect('person.familyAsChild', 'familyAsChild');
    qb.leftJoinAndSelect('person.events', 'personEvents');

    // Зв'язки для familyAsParent
    qb.leftJoinAndSelect('familyAsParent.parents', 'familyAsParentParents');
    qb.leftJoinAndSelect('familyAsParent.children', 'familyAsParentChildren');
    qb.leftJoinAndSelect('familyAsParent.events', 'familyAsParentEvents');

    // Зв'язки для familyAsChild
    qb.leftJoinAndSelect('familyAsChild.parents', 'familyAsChildParents');
    qb.leftJoinAndSelect('familyAsChild.children', 'familyAsChildChildren');
    qb.leftJoinAndSelect('familyAsChild.events', 'familyAsChildEvents');

    // Події для батьків і дітей у familyAsParent
    qb.leftJoinAndSelect(
      'familyAsParentParents.events',
      'familyAsParentParentsEvents',
    );
    qb.leftJoinAndSelect(
      'familyAsParentChildren.events',
      'familyAsParentChildrenEvents',
    );

    // Події для батьків і дітей у familyAsChild
    qb.leftJoinAndSelect(
      'familyAsChildParents.events',
      'familyAsChildParentsEvents',
    );
    qb.leftJoinAndSelect(
      'familyAsChildChildren.events',
      'familyAsChildChildrenEvents',
    );

    // Умова для вибору особи
    qb.where('person.id = :id', { id });
    return await qb.getOne();
  }

  public async getAll(
    query: PersonsQueryDto,
  ): Promise<[PersonEntity[], number]> {
    const qb = this.createQueryBuilder('person');
    if (query.search) {
      qb.andWhere(
        'CONCAT(person.name, person.surName, person.marriedSurName, person.note, ) ILIKE :search',
      );
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.leftJoinAndSelect('person.familyAsParent', 'familyAsParent');
    qb.leftJoinAndSelect('familyAsParent.parents', 'familyParent');
    qb.leftJoinAndSelect('familyAsParent.children', 'familyChildren');
    qb.leftJoinAndSelect('person.familyAsChild', 'familyAsChild');
    qb.leftJoinAndSelect('familyAsChild.parents', 'familyParents');
    qb.leftJoinAndSelect('person.events', 'events');
    qb.leftJoinAndSelect('familyAsParent.events', 'familyEvents');

    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
