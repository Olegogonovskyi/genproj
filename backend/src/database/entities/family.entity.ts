import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { PersonEntity } from './person.entity';
import { EventsEntity } from './events.entity';

@Entity(EntityEnum.FAMILY)
export class FamilyEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text', { nullable: true })
  insideId: string;

  @Column('text', { nullable: true, unique: true })
  uid?: string;

  @Column('text', { nullable: true })
  updated?: string;

  @ManyToMany(() => PersonEntity, (person) => person.familyAsParent)
  @JoinTable({
    name: 'family_persons',
    joinColumn: { name: 'family_uid', referencedColumnName: 'uid' },
    inverseJoinColumn: {
      name: 'person_uid',
      referencedColumnName: 'uid',
    },
  })
  parents?: PersonEntity[];

  @ManyToMany(() => PersonEntity, (person) => person.familyAsChild)
  @JoinTable({
    name: 'family_children',
    joinColumn: { name: 'family_uid', referencedColumnName: 'uid' },
    inverseJoinColumn: {
      name: 'persons_uid',
      referencedColumnName: 'uid',
    },
  })
  children?: PersonEntity[];

  @ManyToMany(() => EventsEntity, (event) => event.family, { nullable: true })
  @JoinTable({
    name: 'family_events',
    joinColumn: { name: 'family_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
  })
  events: EventsEntity[] | null;
}
