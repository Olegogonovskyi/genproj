import { Entity, Column } from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';

@Entity(EntityEnum.CHRONOLOGY)
export class ChronologyEntity extends IdCreateUpdateEntity {
  @Column('int')
  year: number;

  @Column('text')
  description: string;

  @Column('boolean', { default: true })
  isActive: boolean;
}
