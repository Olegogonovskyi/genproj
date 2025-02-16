import { Column, Entity, OneToMany } from 'typeorm';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';
import { RoleEnum } from '../enums/role.enum';
import { RefreshTokenEntity } from './refreshToken.entity';
import { Exclude } from 'class-transformer';
import { EntityEnum } from '../enums/entityEnum';
import { AuthMethodEnum } from '../enums/AuthMethodEnum';
import { ArticleEntity } from './article.entity';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity(EntityEnum.USERS)
export class UsersEntity extends IdCreateUpdateEntity {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Exclude()
  @Column('text', { nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: AuthMethodEnum,
    default: AuthMethodEnum.EMAIL,
  })
  authMethod: AuthMethodEnum;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.READER })
  role: RoleEnum;

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;

  @Column('boolean', { default: false })
  isVerified: boolean;

  @Column('text', { nullable: true })
  verifyToken: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];
}
