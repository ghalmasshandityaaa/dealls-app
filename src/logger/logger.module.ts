import { DynamicModule, Module, Provider } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import pino, { LoggerOptions } from 'pino';
import { Options } from 'pino-http';
import { LoggerModuleAsyncOptions, LoggerModuleOptions } from './interfaces';
import { OPTIONS_PROVIDER, TYPEORM_PINO_LOGGER } from './logger.constants';
import { createAsyncOptionsProvider } from './logger.providers';
import { TypeOrmPinoLoggerProvider } from './providers/typeorm.pino-logger.provider';

@Module({})
export class LoggerModule {
  /**
   *
   * @param options
   * @returns
   */
  static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    const providers: Provider<any>[] = [
      createAsyncOptionsProvider(options),
      { provide: TYPEORM_PINO_LOGGER, useClass: TypeOrmPinoLoggerProvider },
    ];

    return {
      global: true,
      module: LoggerModule,
      imports: [
        ...(options.imports || []),
        PinoLoggerModule.forRootAsync({
          useFactory: (options: LoggerModuleOptions) => ({
            exclude: options.excludePath,
            pinoHttp: this.getPinoHttpConfig(options),
          }),
          inject: [OPTIONS_PROVIDER],
        }),
      ],
      providers,
      exports: providers,
    };
  }

  /**
   *
   * @param options
   * @returns
   */
  private static getPinoHttpConfig(options: LoggerModuleOptions): Options {
    const pinoOptions: LoggerOptions = {
      level: options.level,
      formatters: {
        // removes pid + hostname
        bindings: () => ({}),
      },
    };

    return {
      logger: pino(pinoOptions),
      genReqId: (): string => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';

        for (let i = 0; i < 50; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
      },
      quietReqLogger: true,
    };
  }
}
