import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards';
import { ResponseEnvelopeInterceptor } from './common/interceptors';
import { JwtStrategy } from './common/strategies';
import { ConfigModule } from './config/config.module';
import { DatabaseConfigModule, DatabaseConfigService } from './config/database';
import { LoggerConfigModule, LoggerConfigService } from './config/logger';
import { TypeOrmOptionsProvider } from './database/config';
import { LoggerModule } from './logger/logger.module';
import { PackageModule } from './package/package.module';
import { RedisModule } from './redis';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CqrsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    LoggerModule.forRootAsync({
      imports: [LoggerConfigModule],
      useFactory: (config: LoggerConfigService) => ({
        level: config.level,
        excludePath: [],
      }),
      inject: [LoggerConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useClass: TypeOrmOptionsProvider,
      inject: [DatabaseConfigService],
    }),
    ConfigModule,
    AuthModule,
    PackageModule,
    UserModule,
    RedisModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseEnvelopeInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    JwtStrategy,
    JwtAuthGuard,
  ],
})
export class AppModule {}
