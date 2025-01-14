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
import { FamilyEntity } from './family.entity';
import { IndividualEntity } from './individual.entity';

@Entity(EntityEnum.DATES)
export class DatesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string', { nullable: true })
  updated?: string;

  @Column('string', { nullable: false })
  type?: string;

  @Column('date')
  date: Date;

  @OneToOne(() => FamilyEntity, (entity) => entity.date)
  @JoinColumn()
  family: FamilyEntity;

  @ManyToMany(() => IndividualEntity, (entity) => entity.dates)
  @JoinTable()
  individuals: IndividualEntity[];
}
