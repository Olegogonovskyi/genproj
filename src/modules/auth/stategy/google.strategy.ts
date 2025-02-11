import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Config } from '../../../config/config.types';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService<Config>) {
    // const googleConfig = configService.get<GoogleAuth>('google');
    // const appConfig = configService.get<AppConfig>('app');

    super({
      // clientID: googleConfig.ClientID,
      // clientSecret: googleConfig.ClientSecret,
      // callbackURL: `http://${appConfig.host}:${appConfig.port}${googleConfig.Url}`,
      clientID:
        '1037039202008-otmb7ue5b7q27n74jiu3jb6ndupekd7l.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: `http://localhost:3003/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    try {
      if (!profile?.emails?.[0]?.value) {
        throw new UnauthorizedException('Missing email in Google profile');
      }

      const { name, emails } = profile;

      const user = {
        email: emails[0].value,
        name: `${name.givenName} ${name.familyName}`,
      };
      return { ...user };
    } catch (error) {
      done(error, null);
    }
  }
}
