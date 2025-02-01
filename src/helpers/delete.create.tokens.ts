import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCacheService } from 'src/modules/auth/services/auth.catch.service';
import { RefreshTokenRepository } from 'src/modules/repository/services/refreshToken.repository';
import { TokenPair } from '../models/tokenPair';

@Injectable()
export class DeleteCreateTokens {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}
  public async deleteTokens(deviceId: string, id: string): Promise<void> {
    try {
      await Promise.all([
        this.refreshTokenRepository.delete({
          deviceId: deviceId,
          userID: id,
        }),
        this.authCacheService.deleteToken(id, deviceId),
      ]);
    } catch (e) {
      throw new InternalServerErrorException('Failed to delete tokens');
    }
  }
  public async saveNewTokens(
    deviceId: string,
    id: string,
    tokens: TokenPair,
  ): Promise<void> {
    try {
      await Promise.all([
        this.refreshTokenRepository.save({
          deviceId: deviceId,
          refreshToken: tokens.refreshToken,
          userID: id,
        }),
        this.authCacheService.saveToken(tokens.accessToken, id, deviceId),
      ]);
    } catch (e) {
      throw new InternalServerErrorException('Failed to save tokens');
    }
  }
}
