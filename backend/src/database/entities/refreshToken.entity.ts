import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IdCreateUpdateEntity } from './models/IdCreateUpdateEntity';
import { UsersEntity } from './users.entity';
import { EntityEnum } from '../enums/entityEnum';

@Entity(EntityEnum.REFRESH_TOKEN)
export class RefreshTokenEntity extends IdCreateUpdateEntity {
  @Column('text')
  refreshToken: string;

  @Column('text')
  deviceId: string;

  @Column('text')
  userID: string;
  @ManyToOne(() => UsersEntity, (entity) => entity.refreshTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userID' })
  user?: UsersEntity;
}
