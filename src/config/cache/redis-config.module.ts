import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RedisConfigService } from './redis-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().optional().allow('').default('127.0.0.1'),
        REDIS_PORT: Joi.number().optional().allow('').default(6379),
        REDIS_USERNAME: Joi.string().optional().allow('').default(''),
        REDIS_PASSWORD: Joi.string().optional().allow('').default(''),
        REDIS_DATABASE: Joi.number().optional().allow('').default(0),
        REDIS_SSL: Joi.string().optional().allow('').default(false),
        REDIS_CACHE_TTL: Joi.number().optional().allow('').default(3600),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  providers: [RedisConfigService],
  exports: [RedisConfigService],
})
export class RedisConfigModule {}
