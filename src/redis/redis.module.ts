import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { PinoLogger } from 'nestjs-pino';
import { RedisConfigModule, RedisConfigService } from '../config/cache';
import { RedisService } from './redis.service';

@Global()
@Module({})
export class RedisModule {
  static forRoot(): DynamicModule {
    const redisServiceProvider: Provider<RedisService> = {
      provide: RedisService,
      useFactory: (configService: RedisConfigService, logger: PinoLogger) => {
        const redisClient = new Redis({
          host: configService.redisHost,
          port: configService.redisPort,
          username: configService.redisUsername,
          password: configService.redisPassword,
          db: configService.redisDatabase,
          enableAutoPipelining: true,
          enableOfflineQueue: true,
          maxRetriesPerRequest: 3,
          enableReadyCheck: true,
          offlineQueue: true,
          tls: configService.redisSsl
            ? {
                rejectUnauthorized: false,
              }
            : undefined,
        });

        logger.setContext(RedisService.name);
        redisClient.on('connect', () => {
          logger.info('Redis Client Connected');
        });

        redisClient.on('error', (error) => {
          logger.error(`Redis Client Error: ${error.message}`);
        });

        redisClient.on('reconnecting', () => {
          logger.info('Redis Client Reconnecting');
        });

        redisClient.on('close', () => {
          logger.info('Redis Client Closed');
        });

        return new RedisService(redisClient);
      },
      inject: [RedisConfigService, PinoLogger],
    };

    return {
      imports: [RedisConfigModule],
      module: RedisModule,
      providers: [redisServiceProvider],
      exports: [RedisService],
    };
  }
}
