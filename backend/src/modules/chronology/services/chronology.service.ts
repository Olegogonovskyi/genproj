import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ChronologyRepository } from '../../repository/services/chronology.repository';
import { ChronologyEntity } from '../../../database/entities/chronology.entity';
import { CreateUpdateDto } from '../dto/req/createUpdate.dto';
import { ChronologyQueryDto } from '../dto/req/chronologyQueryDto';

@Injectable()
export class ChronologyService {
  constructor(private readonly chronologyRepository: ChronologyRepository) {}

  public async create(dto: CreateUpdateDto): Promise<ChronologyEntity> {
    return await this.chronologyRepository.save(
      this.chronologyRepository.create(dto),
    );
  }

  public async addMany(
    arrayOfDates: CreateUpdateDto[],
  ): Promise<ChronologyEntity[]> {
    try {
      const entities = arrayOfDates.map((dto) =>
        this.chronologyRepository.create(dto),
      );
      return await this.chronologyRepository.save(entities);
    } catch (error) {
      throw new InternalServerErrorException('Failed to save dates');
    }
  }

  public async getById(dateId: string): Promise<ChronologyEntity> {
    const dateById = await this.chronologyRepository.findOne({
      where: { id: dateId },
    });
    if (!dateById) {
      throw new NotFoundException(`date with ID ${dateId} not found`);
    }
    return dateById;
  }

  public async update(
    dto: CreateUpdateDto,
    id: string,
  ): Promise<ChronologyEntity> {
    try {
      const dateEntity = await this.getById(id);
      this.chronologyRepository.merge(dateEntity, { ...dto });

      return await this.chronologyRepository.save(dateEntity);
    } catch (e) {
      throw new BadRequestException('Failed to update date');
    }
  }

  public async getListOfDates(
    query: ChronologyQueryDto,
  ): Promise<[ChronologyEntity[], number]> {
    return await this.chronologyRepository.getList(query);
  }

  public async delete(dateId: string): Promise<void> {
    await this.chronologyRepository.delete({ id: dateId });
  }
}
