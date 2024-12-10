import { PartialType } from '@nestjs/mapped-types';
import { CreateGedparseDto } from './create-gedparse.dto';

export class UpdateGedparseDto extends PartialType(CreateGedparseDto) {}
