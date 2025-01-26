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
import { PersonEntity } from './person.entity';
import { EventsEntity } from './events.entity';

@Entity(EntityEnum.FAMILY)
export class FamilyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: true })
  uid: string;

  @Column('text', { nullable: true })
  updated?: string;

  @ManyToMany(() => PersonEntity, (person) => person.familyAsParent)
  @JoinTable() // Створює проміжну таблицю для parents
  parents: PersonEntity[];

  @ManyToMany(() => PersonEntity, (person) => person.familyAsChild)
  @JoinTable() // Створює проміжну таблицю для children
  children: PersonEntity[];

  @OneToOne(() => EventsEntity, (entity) => entity.family)
  @JoinColumn()
  events: EventsEntity[];
}
