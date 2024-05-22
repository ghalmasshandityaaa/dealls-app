import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands';
import { PackageController } from './controllers/package.controller';
import { TypeOrmPackageEntities } from './entities';
import { USER_PACKAGE_WRITE_REPOSITORY } from './package.constant';
import { UserPackageWriteRepository } from './repositories';

const repositories: Provider[] = [
  {
    provide: USER_PACKAGE_WRITE_REPOSITORY,
    useClass: UserPackageWriteRepository,
  },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(TypeOrmPackageEntities)],
  controllers: [PackageController],
  providers: [...CommandHandlers, ...repositories],
})
export class PackageModule {}
