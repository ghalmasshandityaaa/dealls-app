import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { TokenConfigService } from './token-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        JWT_ACCESS_EXPIRATION: Joi.string().default('15m'),
        JWT_REFRESH_EXPIRATION: Joi.string().default('30d'),
        JWT_SECRET: Joi.string().required(),
        JWT_ALGORITHM: Joi.string().default('HS256'),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  providers: [TokenConfigService],
  exports: [TokenConfigService],
})
export class TokenConfigModule {}
