import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands';
import { UserController } from './controllers';
import { TypeOrmUserEntities } from './entities';
import { Listeners } from './listeners';
import { QueryHandlers } from './queries';
import {
  DatingHistoryWriteRepository,
  UserReadRepository,
  UserWriteRepository,
} from './repositories';
import { UserService } from './services';
import {
  DATING_HISTORY_WRITE_REPOSITORY,
  USER_READ_REPOSITORY,
  USER_SERVICE,
  USER_WRITE_REPOSITORY,
} from './user.constant';

const services: Provider<any>[] = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

const repositories: Provider<any>[] = [
  {
    provide: USER_READ_REPOSITORY,
    useClass: UserReadRepository,
  },
  {
    provide: USER_WRITE_REPOSITORY,
    useClass: UserWriteRepository,
  },
  {
    provide: DATING_HISTORY_WRITE_REPOSITORY,
    useClass: DatingHistoryWriteRepository,
  },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(TypeOrmUserEntities)],
  controllers: [UserController],
  providers: [...CommandHandlers, ...QueryHandlers, ...Listeners, ...services, ...repositories],
  exports: [...services],
})
export class UserModule {}
