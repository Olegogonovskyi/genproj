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

@Injectable()
export class AncestorsService {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly familyRepository: FamilyRepository,
  ) {}

  public async getById(id: string): Promise<PersonEntity> {
    try {
      const ancestor = await this.personRepository.getPerson(id);
      console.log(ancestor);
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

  public async getAllFamilies(
    query: PersonsQueryDto,
  ): Promise<[FamilyEntity[], number]> {
    try {
      return await this.familyRepository.getAll(query);
    } catch (error) {
      throw new InternalServerErrorException('Failed to find families');
    }
  }
}
