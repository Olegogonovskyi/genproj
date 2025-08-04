import { RegisterAuthResDto } from '../../../auth/dto/res/register.auth.res.dto';
import { UsersQueryDto } from '../req/users.query.dto';

export class UsersListResDto extends UsersQueryDto {
  data: RegisterAuthResDto[];
  total: number;
}
