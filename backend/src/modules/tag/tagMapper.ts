import { TagsEntity } from '../../database/entities/tag.entity';
import { TagsResDto } from './dto/res/tagsResDto';

export class TagMapper {
  public static toResponseListDTO(entities: TagsEntity[]): TagsResDto[] {
    return entities.map(this.toResponseDTO);
  }

  public static toResponseDTO(entity: TagsEntity): TagsResDto {
    return {
      name: entity.name,
      articleCount: entity.articleCount,
    };
  }
}
