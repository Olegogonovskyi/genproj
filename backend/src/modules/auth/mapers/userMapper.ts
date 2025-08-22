import { UsersEntity } from 'src/database/entities/users.entity';
import { RegisterAuthResDto } from '../dto/res/register.auth.res.dto';
import { JwtPayload } from '../../../models/jwtPayload';
import { ReqAfterGuardDto } from '../dto/req/reqAfterGuard.dto';
import { UsersListResDto } from '../../users/dto/res/usersListRes.dto';
import { UsersQueryDto } from '../../users/dto/req/users.query.dto';

export class UserMapper {
  public static toResponseDTO(data: UsersEntity): RegisterAuthResDto {
    const { id, name, email, role, isVerified, authMethod } = data;
    return {
      id,
      name,
      email,
      role,
      isVerified,
      authMethod,
    };
  }

  public static toReqUserData(
    user: UsersEntity,
    payload: JwtPayload,
  ): ReqAfterGuardDto {
    return {
      id: payload.userId,
      deviceId: payload.deviceId,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };
  }

  public static toResListDto(
    entities: UsersEntity[],
    total: number,
    query: UsersQueryDto,
  ): UsersListResDto {
    return {
      data: entities.map((entity) => this.toResponseDTO(entity)),
      total,
      ...query,
    };
  }
}
