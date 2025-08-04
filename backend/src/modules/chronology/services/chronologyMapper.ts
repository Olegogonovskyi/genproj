import { ChronologyEntity } from '../../../database/entities/chronology.entity';
import { ChronologyQueryDto } from '../dto/req/chronologyQuery.dto';
import { ChronologyListResDto } from '../dto/res/chronologyListRes.dto';

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
