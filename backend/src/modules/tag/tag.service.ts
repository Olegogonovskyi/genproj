import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TagsRepository } from '../repository/services/tags.repository';
import { TagsEntity } from '../../database/entities/tag.entity';
import { TagsQertyDto } from './dto/req/tags.qerty.dto';
import { UpdateTagDto } from './dto/req/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagsRepository: TagsRepository) {}

  public async getPopular(): Promise<TagsEntity[]> {
    return await this.tagsRepository.getPopular();
  }

  public async getListofTags(
    query: TagsQertyDto,
  ): Promise<[TagsEntity[], number]> {
    return await this.tagsRepository.getList(query);
  }

  public async getByID(tagId: string): Promise<TagsEntity> {
    const oneTag = await this.tagsRepository.findOne({
      where: { id: tagId },
      relations: ['articles'],
    });
    if (!oneTag) {
      throw new NotFoundException(`Tag with ID ${oneTag} not found`);
    }
    return oneTag;
  }

  public async deleteTag(tagId: string): Promise<void> {
    console.log(`tagId ${tagId}`)
    try {
      await this.tagsRepository.delete({ id: tagId });
    } catch (e) {
      throw new InternalServerErrorException('Failed to delete the tag');
    }
  }

  public async updateTag(
    dto: UpdateTagDto,
    tagId: string,
  ): Promise<TagsEntity> {
    const tagToUpdate = await this.tagsRepository.findOneBy({ id: tagId });
    this.tagsRepository.merge(tagToUpdate, { ...dto });
    return await this.tagsRepository.save(tagToUpdate);
  }
}
