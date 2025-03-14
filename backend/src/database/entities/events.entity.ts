import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
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
  familyId: string;

  @ManyToOne(() => FamilyEntity, (family) => family.events)
  @JoinColumn({ name: 'familyId', referencedColumnName: 'insideId' })
  family: FamilyEntity;

  @ManyToMany(() => PersonEntity, (entity) => entity.events)
  persons?: PersonEntity[];
}
