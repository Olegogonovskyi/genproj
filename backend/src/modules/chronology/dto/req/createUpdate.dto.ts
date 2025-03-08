import { PartialType, PickType } from '@nestjs/swagger';
import { ChronologyBaseDto } from './chronologyBase.dto';

export class CreateUpdateDto extends PartialType(
  PickType(ChronologyBaseDto, ['year', 'description', 'image']),
) {}
