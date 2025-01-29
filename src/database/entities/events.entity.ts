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
import { PersonEntity } from './person.entity';

@Entity(EntityEnum.EVENTS)
export class EventsEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text', { nullable: false })
  type?: string;

  @Column('text', { nullable: true })
  date?: string;

  @Column('text', { nullable: true })
  place?: string;

  @OneToOne(() => FamilyEntity, (entity) => entity.events)
  @JoinColumn()
  family?: FamilyEntity;

  @ManyToMany(() => PersonEntity, (entity) => entity.events)
  @JoinTable()
  persons?: PersonEntity[];
}
