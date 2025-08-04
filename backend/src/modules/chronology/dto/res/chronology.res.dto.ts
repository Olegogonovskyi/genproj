import { PartialType, PickType } from '@nestjs/swagger';
import { ChronologyBaseDto } from '../req/chronologyBase.dto';

export class ChronologyResDto extends PartialType(
  PickType(ChronologyBaseDto, ['id', 'year', 'description', 'isActive']),
) {}
