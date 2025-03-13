import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PersonRepository } from '../../repository/services/person.repository';
import { PersonEntity } from '../../../database/entities/person.entity';
import { PersonsQueryDto } from '../dto/req/personsQuery.dto';

@Injectable()
export class AncestorsService {
  constructor(private readonly personRepository: PersonRepository) {}

  public async getById(id: string): Promise<PersonEntity> {
    try {
      const ancestor = await this.personRepository.getPerson(id);
      if (!ancestor) {
        throw new NotFoundException(`ancestor with ID ${id} not found`);
      }
      return ancestor;
    } catch (error) {
      console.log(error);
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
}
