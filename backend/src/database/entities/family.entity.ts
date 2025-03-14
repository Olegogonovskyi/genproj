import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  @JoinTable({
    name: 'family_persons',
    joinColumn: { name: 'family_inside_id', referencedColumnName: 'insideId' },
    inverseJoinColumn: {
      name: 'person_inside_id',
      referencedColumnName: 'insideId',
    },
  })
  parents?: PersonEntity[];

  @ManyToMany(() => PersonEntity, (person) => person.familyAsChild)
  @JoinTable({
    name: 'family_children',
    joinColumn: { name: 'family_inside_id', referencedColumnName: 'insideId' },
    inverseJoinColumn: {
      name: 'persons_inside_id',
      referencedColumnName: 'insideId',
    },
  })
  children?: PersonEntity[];

  @OneToMany(() => EventsEntity, (event) => event.family)
  events: EventsEntity[]; // Зв'язок з подіями
}
