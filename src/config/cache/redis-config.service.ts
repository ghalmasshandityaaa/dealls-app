import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisConfig } from './redis-config.interface';

@Injectable()
export class RedisConfigService implements RedisConfig {
  constructor(private config: ConfigService) {}

  get redisHost(): string {
    return this.config.getOrThrow('REDIS_HOST');
  }

  get redisPort(): number {
    const port = this.config.getOrThrow('REDIS_PORT');
    return Number(port);
  }

  get redisUsername(): string {
    return this.config.getOrThrow('REDIS_USERNAME');
  }

  get redisPassword(): string {
    return this.config.getOrThrow('REDIS_PASSWORD');
  }

  get redisDatabase(): number {
    const database = this.config.getOrThrow('REDIS_DATABASE');
    return Number(database);
  }

  get redisSsl(): boolean {
    return this.config.get('REDIS_SSL') === 'true';
  }

  get redisCacheTtl(): number {
    const cacheTtl = this.config.getOrThrow('REDIS_CACHE_TTL');
    return Number(cacheTtl);
  }
}
