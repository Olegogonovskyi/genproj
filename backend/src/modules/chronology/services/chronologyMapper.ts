import { ChronologyEntity } from '../../../database/entities/chronology.entity';
import { ChronologyQueryDto } from '../dto/req/chronologyQueryDto';
import { ChronologyListResDto } from '../dto/res/chronologyListResDto';

export class ChronologyMapper {
  public static toResListDto(
    entities: ChronologyEntity[],
    total: number,
    query: ChronologyQueryDto,
  ): ChronologyListResDto {
    return {
      data: entities,
      total,
      ...query,
    };
  }
}
