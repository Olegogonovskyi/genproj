import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersEntity } from '../../../database/entities/users.entity';
import { UsersQueryDto } from '../../users/dto/req/users.query.dto';

@Injectable()
export class UserRepository extends Repository<UsersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UsersEntity, dataSource.manager);
  }

  public async getList(query: UsersQueryDto): Promise<[UsersEntity[], number]> {
    const qb = this.createQueryBuilder('user');
    if (query.search) {
      qb.andWhere('CONCAT(user.name, user.email) ILIKE :search');
      qb.setParameter('search', `%${query.search}%`);
    }
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }
}
