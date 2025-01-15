import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => IndividualEntity, (entity) => entity.familiesParent)
  @JoinTable()
  parents?: FamilyEntity[];

  @ManyToMany(() => IndividualEntity, (entity) => entity.familiesChildren)
  @JoinTable()
  children?: FamilyEntity[];

  @OneToOne(() => DatesEntity, (entity) => entity.family)
  @JoinColumn()
  date: DatesEntity;
}
