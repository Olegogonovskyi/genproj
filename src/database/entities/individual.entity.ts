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

  @Column('text', { nullable: false, default: false })
  isDead: boolean;

  @Column('text', { nullable: true })
  npfx: string;

  @Column('text', { nullable: true })
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
