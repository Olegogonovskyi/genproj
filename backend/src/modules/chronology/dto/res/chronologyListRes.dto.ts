import { ChronologyQueryDto } from '../req/chronologyQuery.dto';
import { ChronologyEntity } from '../../../../database/entities/chronology.entity';

export class ChronologyListResDto extends ChronologyQueryDto {
  data: ChronologyEntity[];
  total: number;
}
