import { Module } from '@nestjs/common';
import { RedisConfigModule } from './cache';
import { DatabaseConfigModule } from './database';
import { LoggerConfigModule } from './logger';
import { ServerConfigModule } from './server';
import { TokenConfigModule } from './token';

@Module({
  imports: [
    ServerConfigModule,
    LoggerConfigModule,
    DatabaseConfigModule,
    TokenConfigModule,
    RedisConfigModule,
  ],
})
export class ConfigModule {}
