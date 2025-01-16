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

  @ManyToMany(() => IndividualEntity, (person) => person.familyAsParent)
  @JoinTable() // Створює проміжну таблицю для parents
  parents: IndividualEntity[];

  @ManyToMany(() => IndividualEntity, (person) => person.familyAsChild)
  @JoinTable() // Створює проміжну таблицю для children
  children: IndividualEntity[];

  @OneToOne(() => DatesEntity, (entity) => entity.family)
  @JoinColumn()
  date: DatesEntity;
}
