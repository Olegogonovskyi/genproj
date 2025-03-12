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
    qb.leftJoinAndSelect('person.familyAsParent', 'familyAsParent');
    qb.leftJoinAndSelect('familyAsParent.parents', 'familyParent');
    qb.leftJoinAndSelect('familyAsParent.children', 'familyChildren');
    qb.leftJoinAndSelect('person.events', 'events'); // Додано events
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
    qb.leftJoinAndSelect('person.events', 'events'); // Додано events
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
