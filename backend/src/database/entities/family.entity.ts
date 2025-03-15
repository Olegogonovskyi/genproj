import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { PersonEntity } from './person.entity';
import { EventsEntity } from './events.entity';

@Entity(EntityEnum.FAMILY)
export class FamilyEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text', { nullable: false, unique: true })
  insideId: string;

  @Column('text', { nullable: true })
  uid?: string;

  @Column('text', { nullable: true })
  updated?: string;

  @ManyToMany(() => PersonEntity, (person) => person.familyAsParent)
  parents?: PersonEntity[];

  @ManyToMany(() => PersonEntity, (person) => person.familyAsChild)
  children?: PersonEntity[];

  @ManyToMany(() => EventsEntity, (event) => event.family)
  events: EventsEntity[];
}
