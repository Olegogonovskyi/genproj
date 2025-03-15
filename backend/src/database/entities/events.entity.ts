import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { FamilyEntity } from './family.entity';
import { PersonEntity } from './person.entity';

@Entity(EntityEnum.EVENTS)
export class EventsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  type: string;

  @Column('text', { nullable: true })
  date?: string;

  @Column('text', { nullable: true })
  place?: string;

  @Column({ type: 'text', nullable: true })
  familyId?: string;

  @ManyToMany(() => FamilyEntity, (family) => family.events)
  @JoinTable({
    name: 'family_events',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'family_id', referencedColumnName: 'id' },
  })
  family?: FamilyEntity[];

  @ManyToMany(() => PersonEntity, (entity) => entity.events)
  persons?: PersonEntity[];
}
