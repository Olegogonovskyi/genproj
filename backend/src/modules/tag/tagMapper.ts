import { TagsEntity } from '../../database/entities/tag.entity';
import { TagsResDto } from './dto/res/tagsRes.dto';
import { ArticleMapper } from '../articlesNew/mapers/ArticleMapper';
import { TagsQertyDto } from './dto/req/tags.qerty.dto';
import { TagsListDto } from './dto/res/tagsList.dto';

export class TagMapper {
  public static toResponseListDTO(entities: TagsEntity[]): TagsResDto[] {
    return entities.map(this.toResponseDTO);
  }

  public static toResponseDTO(entity: TagsEntity): TagsResDto {
    return {
      id: entity.id,
      name: entity.name,
      articleCount: entity.articleCount,
      articles: entity.articles?.map((article) =>
        ArticleMapper.simpleArticleMapper(article),
      ),
    };
  }

  public static toResListDto(
    entities: TagsEntity[],
    total: number,
    query: TagsQertyDto,
  ): TagsListDto {
    return {
      data: entities.map((entity) => this.toResponseDTO(entity)),
      total,
      ...query,
    };
  }
}
