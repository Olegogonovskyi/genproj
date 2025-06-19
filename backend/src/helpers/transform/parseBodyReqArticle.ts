import { plainToInstance } from 'class-transformer';
import { ArticleBlocksDto } from '../../modules/articlesNew/dto/req/articleBlocks.dto';

export class ParseBodyReqArticle {
  public static parse({ value }) {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return parsed.map((item: any) =>
          plainToInstance(ArticleBlocksDto, item),
        );
      } catch (e) {
        throw new Error('Поле body має бути валідним JSON-масивом');
      }
    }
    return value;
  }
}
