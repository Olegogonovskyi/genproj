import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { FamilyEntity } from '../../../database/entities/family.entity';
import { PersonsQueryDto } from '../../ancestors/dto/req/personsQuery.dto';

@Injectable()
export class FamilyRepository extends Repository<FamilyEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(FamilyEntity, dataSource.manager);
  }

  public async getAll(
    query: PersonsQueryDto,
  ): Promise<[FamilyEntity[], number]> {
    const qb = this.createQueryBuilder('family');
    if (query.search) {
      qb.andWhere(
        '(parents.name ILIKE :search OR children.name ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }
    qb.leftJoinAndSelect('family.parents', 'parents'); // Підключаємо батьків
    qb.leftJoinAndSelect('family.children', 'children'); // Підключаємо дітей
    qb.leftJoinAndSelect('family.events', 'events'); // Підключаємо події
    qb.take(query.limit || 10);
    qb.skip(query.offset || 0);
    return await qb.getManyAndCount();
  }

  public async getFamilyById(id: string): Promise<FamilyEntity> {
    console.log('repo 32');
    const qb = this.createQueryBuilder('family');
    qb.leftJoinAndSelect('family.parents', 'parents'); // Підключаємо батьків
    qb.leftJoinAndSelect('family.children', 'children'); // Підключаємо дітей
    qb.leftJoinAndSelect('family.events', 'events'); // Підключаємо події
    qb.where('family.id = :id', { id });
    return await qb.getOne();
  }
}
