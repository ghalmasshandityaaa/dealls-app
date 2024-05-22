import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthError } from '../../auth/errors';
import { RedisService } from '../../redis';
import { IUserService, UserQueryModel } from '../../user/interfaces';
import { USER_SERVICE } from '../../user/user.constant';
import { IIdentity, Package } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService,
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    private readonly redis: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<IIdentity> {
    const identity = {
      id: payload.sub,
      package: Package.STANDARD,
    };

    const key = `user:query:${payload.sub}`;
    const result = await this.redis.get<UserQueryModel>(key);
    if (result) {
      identity.package = result.package;
    } else {
      const user = await this.userService.findById(payload.sub);
      if (!user) throw new AuthError.InvalidCredentials();

      identity.package = user.package;
    }

    return identity;
  }
}
