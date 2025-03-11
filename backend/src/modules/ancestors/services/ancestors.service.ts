import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PersonRepository } from '../../repository/services/person.repository';
import { PersonEntity } from '../../../database/entities/person.entity';

@Injectable()
export class AncestorsService {
  constructor(private readonly personRepository: PersonRepository) {}

  public async getById(ancestorId: string): Promise<PersonEntity> {
    try {
      const ancestor = await this.personRepository.getPerson(ancestorId);
      if (!ancestor) {
        throw new NotFoundException(`ancestor with ID ${ancestorId} not found`);
      }
      return ancestor;
    } catch (error) {
      throw new InternalServerErrorException('Failed to find ancestor by Id');
    }
  }
}
