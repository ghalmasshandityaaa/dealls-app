import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../common/strategies';
import { TokenConfigModule, TokenConfigService } from '../config/token';
import { UserModule } from '../user/user.module';
import { TOKEN_SERVICE } from './auth.constant';
import { CommandHandlers } from './commands';
import { AuthController } from './controllers';
import { TokenService } from './services';

const services: Provider<any>[] = [
  {
    provide: TOKEN_SERVICE,
    useClass: TokenService,
  },
];

@Module({
  imports: [
    CqrsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: TokenConfigService) => {
        return {
          secret: configService.secret,
          signOptions: {
            algorithm: configService.algorithm as any,
          },
          global: true,
        };
      },
      imports: [TokenConfigModule],
      inject: [TokenConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers, ...services, JwtStrategy],
  exports: [...services],
})
export class AuthModule {}
