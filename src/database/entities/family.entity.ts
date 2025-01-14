import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { IndividualEntity } from './individual.entity';
import { DatesEntity } from './dates.entity';

@Entity(EntityEnum.FAMILY)
export class FamilyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string', { nullable: true })
  updated?: string;

  @Column('text')
  husbandID: string;
  @ManyToOne(() => IndividualEntity, (entity) => entity.families)
  @JoinColumn({ name: 'husbandID' })
  husband?: IndividualEntity;

  @Column('text')
  wifeID: string;
  @ManyToOne(() => IndividualEntity, (entity) => entity.families)
  @JoinColumn({ name: 'wifeID' })
  wife?: IndividualEntity;

  @OneToOne(() => DatesEntity, (entity) => entity.family)
  @JoinColumn()
  date: DatesEntity;
}
