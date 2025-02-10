import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AppConfig, Config, GoogleAuth } from '../../../config/config.types';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService<Config>) {
    const googleConfig = configService.get<GoogleAuth>('google');
    const appConfig = configService.get<AppConfig>('app');

    super({
      clientID: googleConfig.ClientID,
      clientSecret: googleConfig.ClientSecret,
      callbackURL: `http://${appConfig.host}:${appConfig.port}${googleConfig.Url}`,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { name, emails } = profile;

    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
    };
    const payload = {
      user,
      accessToken,
    };
    console.log(`payload------${payload}`);
    done(null, payload);
  }
}
