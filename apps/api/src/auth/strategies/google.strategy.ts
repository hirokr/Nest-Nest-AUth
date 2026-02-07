import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from '../config/google-oauth.config';
import type { ConfigType } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

// clientID: googleConfig.clientID!,
// clientSecret: googleConfig.clientSecret!,
// callbackURL: googleConfig.callbackURL!,
// scope: ['email', 'profile'],

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfig: ConfigType<typeof googleOauthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfig.clientID!,
      clientSecret: googleConfig.clientSecret!,
      callbackURL: googleConfig.callbackURL!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      password: ' ',
    });

    done(null, user);
    //request.user
    // return user;
  }
}
