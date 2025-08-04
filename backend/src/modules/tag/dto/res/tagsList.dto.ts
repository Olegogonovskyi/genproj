import { BaseTagDto } from './baseTag.dto';
import { TagsQertyDto } from '../req/tags.qerty.dto';

export class TagsListDto extends TagsQertyDto {
  data: BaseTagDto[];
  total: number;
}
