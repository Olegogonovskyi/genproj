import { ArticleEntity } from 'src/database/entities/article.entity';
import { ArticleResDto } from '../dto/res/articleRes.dto';
import { UserMapper } from 'src/modules/auth/mapers/userMapper';
import { ArticleListRequeryDto } from '../dto/req/query.dto';
import { ArticleListResDto } from '../dto/res/articleListRes.dto';
import { StatInfoInterface } from '../types/statInfo.Interface';

export class ArticleMapper {
  private static toResDto(
    article: ArticleEntity,
    statInfo?: StatInfoInterface,
  ): ArticleResDto {
    const { id, title, description, body, isActive, user, image, tags } =
      article;
    const baseDto = {
      id,
      title,
      description,
      body,
      isActive,
      user: UserMapper.toResponseDTO(user),
      image: image.map((img) => `${process.env.AWS_S3_BUCKET_URL}/${img}`),
      tags: tags ? tags.map((tag) => tag.name) : [],
    };

    return statInfo ? { ...baseDto, statInfo: statInfo } : baseDto;
  }

  public static toResCreateUpdateDto(
    article: ArticleEntity,
    statInfo?: StatInfoInterface,
  ): ArticleResDto {
    return this.toResDto(article);
  }

  public static toResListDto(
    entities: ArticleEntity[],
    total: number,
    query: ArticleListRequeryDto,
  ): ArticleListResDto {
    return {
      data: entities.map((entity) => this.toResCreateUpdateDto(entity)),
      total,
      ...query,
    };
  }
}
