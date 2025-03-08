import { ChronologyQueryDto } from '../req/chronologyQueryDto';
import { ChronologyEntity } from '../../../../database/entities/chronology.entity';

export class ChronologyListResDto extends ChronologyQueryDto {
  data: ChronologyEntity[];
  total: number;
}
