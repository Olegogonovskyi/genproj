import {
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { FamilyEntity } from './family.entity';
import { EventsEntity } from './events.entity';

@Entity(EntityEnum.PERSON)
export class PersonEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('text', { nullable: false, unique: true })
  insideId: string;

  @Column('text', { nullable: true })
  uid?: string;

  @Column('text', { nullable: true })
  updated?: string;

  @Column('text', { nullable: true })
  name?: string;

  @Column('text', { nullable: true })
  surName?: string;

  @Column('text', { nullable: true })
  marriedSurName?: string;

  @Column('text', { nullable: false })
  sex: string;

  @Column({ type: 'boolean', default: false })
  isDead?: boolean;

  @Column('text', { nullable: true })
  npfx?: string;

  @Column('text', { nullable: true })
  note?: string;

  @Column('text', { nullable: true })
  object?: string;

  @ManyToMany(() => FamilyEntity, (family) => family.parents, { cascade: true })
  @JoinTable({
    name: 'family_persons',
    joinColumn: { name: 'person_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'family_id', referencedColumnName: 'id' },
  })
  familyAsParent?: FamilyEntity[];

  @ManyToMany(() => FamilyEntity, (family) => family.children, {
    cascade: true,
  })
  @JoinTable({
    name: 'family_children',
    joinColumn: { name: 'person_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'family_id', referencedColumnName: 'id' },
  })
  familyAsChild?: FamilyEntity[];

  @ManyToMany(() => EventsEntity, (event) => event.persons, { cascade: true })
  @JoinTable({
    name: 'person_events',
    joinColumn: { name: 'person_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
  })
  events?: EventsEntity[];
}
