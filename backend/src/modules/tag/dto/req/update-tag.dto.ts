import { Column } from 'typeorm';

export class UpdateTagDto {
  @Column('text', { unique: true })
  name: string;
}
