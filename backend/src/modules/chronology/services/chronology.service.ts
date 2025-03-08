import { Injectable, NotFoundException } from '@nestjs/common';
import { ChronologyRepository } from '../../repository/services/chronology.repository';
import { ChronologyEntity } from '../../../database/entities/chronology.entity';
import { CreateUpdateDto } from '../dto/req/createUpdate.dto';

@Injectable()
export class ChronologyService {
  constructor(private readonly chronologyRepository: ChronologyRepository) {}

  public async create(dto: CreateUpdateDto): Promise<ChronologyEntity> {
    return this.chronologyRepository.create(dto);
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
    const dateEntity = await this.chronologyRepository.findOneBy({ id: id });
    this.chronologyRepository.merge(dateEntity, { ...dto });

    return this.chronologyRepository.save(dateEntity);
  }

  public async delete(dateId: string): Promise<void> {
    await this.chronologyRepository.delete({ id: dateId });
  }
}
