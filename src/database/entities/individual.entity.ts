import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityEnum } from '../enums/entityEnum';
import { FamilyEntity } from './family.entity';
import { DatesEntity } from './dates.entity';

@Entity(EntityEnum.INDIVIDUAL)
export class IndividualEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string', { nullable: true })
  updated?: string;

  @Column('string', { nullable: true })
  name?: string;

  @Column('string', { nullable: false })
  sex?: string;

  @Column('string', { nullable: false, default: false })
  isdead: boolean;

  @Column('string', { nullable: true })
  npfx: string;

  @Column('string', { nullable: true })
  note: string;

  @Column('text', { nullable: true })
  object: string;

  @ManyToMany(() => FamilyEntity, (family) => family.parents, {
    nullable: true,
  })
  familyAsParent: FamilyEntity[] | null;

  @ManyToMany(() => FamilyEntity, (family) => family.children, {
    nullable: true,
  })
  familyAsChild: FamilyEntity[] | null;

  @OneToMany(() => DatesEntity, (entity) => entity.individuals)
  dates?: DatesEntity[];
}
