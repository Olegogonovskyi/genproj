import { NameValidDecorators } from '../../../auth/decorators/nameValid.decorators';

export class UpdateTagDto {
  @NameValidDecorators()
  name: string;
}
