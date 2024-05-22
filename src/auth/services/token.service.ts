import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { IIdentity } from '../../common/interfaces';
import { ITokenService } from '../interfaces';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(token: string): Promise<IIdentity> {
    const options = this.getOptions();
    const decoded = await this.jwtService.verifyAsync(token, options);

    return {
      id: decoded.sub,
      package: decoded.package,
    };
  }

  async generateAccessToken(identity: IIdentity): Promise<string> {
    const options = this.getOptions('access');
    const payload = { sub: identity.id, package: identity.package };
    const token = this.jwtService.signAsync(payload, options);

    return token;
  }

  async generateRefreshToken(identity: IIdentity): Promise<string> {
    const options = this.getOptions('refresh');
    const payload = { sub: identity.id, package: identity.package };
    const token = await this.jwtService.signAsync(payload, options);

    return token;
  }

  private getOptions(type: 'access' | 'refresh' = 'access'): JwtSignOptions {
    const expiresIn =
      type === 'access'
        ? this.configService.get('JWT_ACCESS_EXPIRATION')
        : this.configService.get('JWT_REFRESH_EXPIRATION');

    return {
      expiresIn: expiresIn,
      secret: this.configService.get('JWT_SECRET'),
      algorithm: this.configService.get('JWT_ALGORITHM'),
    };
  }
}
