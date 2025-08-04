import { FamilyResDto } from './family.res.dto';

export class FamilesListQueryDto extends FamilyResDto {
  data: FamilyResDto[];
  total: number;
}
