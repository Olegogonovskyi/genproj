import { UsersEntity } from 'src/database/entities/users.entity';
import { RegisterAuthResDto } from '../dto/res/register.auth.res.dto';
import { JwtPayload } from '../../../models/jwtPayload';
import { ReqAfterGuardDto } from '../dto/req/reqAfterGuard.dto';

export class UserMapper {
  public static toResponseDTO(data: UsersEntity): RegisterAuthResDto {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
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
}
