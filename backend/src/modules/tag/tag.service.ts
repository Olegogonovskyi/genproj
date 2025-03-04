import { Injectable } from '@nestjs/common';
import { TagsRepository } from '../repository/services/tags.repository';
import { TagsEntity } from '../../database/entities/tag.entity';

@Injectable()
export class TagService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  public async getPopular(): Promise<TagsEntity[]> {
    return await this.tagsRepository.getPopular();
  }
}
