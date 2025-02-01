import { RegisterAuthResDto } from './register.auth.res.dto';
import { TokenPair } from '../../../../models/tokenPair';

export class AuthResDto {
  user: RegisterAuthResDto;
  tokens: TokenPair;
}
