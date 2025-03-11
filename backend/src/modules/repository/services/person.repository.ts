import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { PersonEntity } from '../../../database/entities/person.entity';

@Injectable()
export class PersonRepository extends Repository<PersonEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PersonEntity, dataSource.manager);
  }
  public async getPerson(insideId: string): Promise<PersonEntity> {
    const qb = this.createQueryBuilder('person');
    qb.leftJoinAndSelect('person.familyAsParent', 'familyAsParent');
    qb.leftJoinAndSelect('familyAsParent.parents', 'familyParent');
    qb.leftJoinAndSelect('familyAsParent.children', 'familyChildren');
    qb.leftJoinAndSelect('person.events', 'events'); // Додано events
    qb.where('person.insideId = :insideId', { insideId });
    return await qb.getOne();
  }
}
