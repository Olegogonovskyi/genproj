import { UsersEntity } from 'src/database/entities/users.entity';
import { RegisterAuthResDto } from '../dto/res/register.auth.res.dto';
import { JwtPayload } from '../../../models/jwtPayload';
import { ReqAfterGuardDto } from '../dto/req/reqAfterGuard.dto';

export class UserMapper {
  public static toResponseDTO(data: UsersEntity): RegisterAuthResDto {
    const { id, name, email, role, isVerified, authMethod, deviceId } = data;
    return {
      id,
      name,
      email,
      role,
      isVerified,
      authMethod,
      deviceId,
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
