import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column('string', { nullable: true })
  npfx: string;

  @OneToMany(() => FamilyEntity, (entity) => entity.husband)
  families?: FamilyEntity[];

  @OneToMany(() => DatesEntity, (entity) => entity.individuals)
  dates?: DatesEntity[];
}
