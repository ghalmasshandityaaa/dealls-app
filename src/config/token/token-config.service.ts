import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenConfig } from './token-config.interface';

@Injectable()
export class TokenConfigService implements TokenConfig {
  constructor(private config: ConfigService) {}

  get accessExpiration(): string {
    return this.config.getOrThrow('JWT_ACCESS_EXPIRATION');
  }

  get refreshExpiration(): string {
    return this.config.getOrThrow('JWT_REFRESH_EXPIRATION');
  }

  get secret(): string {
    return this.config.getOrThrow('JWT_SECRET');
  }

  get algorithm(): string {
    return this.config.get('JWT_ALGORITHM') || 'HS256';
  }
}
