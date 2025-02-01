import { Column, Entity, OneToMany } from 'typeorm';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';
import { RoleEnum } from '../enums/role.enum';
import { RefreshTokenEntity } from './refreshToken.entity';
import { Exclude } from 'class-transformer';
import { EntityEnum } from '../enums/entityEnum';

@Entity(EntityEnum.USERS)
export class UsersEntity extends IdCreateUpdateEntity {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Exclude()
  @Column('text')
  password: string;

  // @Column('int')
  // age: number;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.READER })
  role: RoleEnum;

  // @Column('text', { nullable: true })
  // image: string;

  @Column('boolean', { default: false })
  isVerified: boolean;

  @Column('text', { nullable: true })
  verifyToken: string;

  // @OneToMany(() => PostsEntity, (entity) => entity.user)
  // posts?: PostsEntity[];
  //
  // @OneToMany(() => CarEntity, (entity) => entity.user)
  // carBrandModels?: CarEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
}
