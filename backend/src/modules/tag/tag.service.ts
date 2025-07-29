import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  public async getListofTags(query: TagsQertyDto) {
    return await this.tagsRepository.getList(query);
    // return {
    //   data: entities.map((oneTag) => ({
    //     id: oneTag.id,
    //     name: oneTag.name,
    //     articles: oneTag.articles?.map((article) =>
    //       ArticleMapper.toResCreateUpdateDto(article),
    //     ),
    //   })),
    //   total: total,
    // };
  }

  public async deleteTag(tagId: string): Promise<void> {
    try {
      await this.tagsRepository.delete(tagId);
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
