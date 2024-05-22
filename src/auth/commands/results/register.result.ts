import { Expose } from 'class-transformer';

export class RegisterResult {
  @Expose({ name: 'access_token' })
  readonly accessToken: string;

  @Expose({ name: 'refresh_token' })
  readonly refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
