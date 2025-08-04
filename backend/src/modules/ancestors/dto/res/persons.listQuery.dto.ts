import { PersonsQueryDto } from '../req/personsQuery.dto';
import { PersonResDto } from './person.res.dto';

export class PersonsListQueryDto extends PersonsQueryDto {
  data: PersonResDto[];
  total: number;
}
