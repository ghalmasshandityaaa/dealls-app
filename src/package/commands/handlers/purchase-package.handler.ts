import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Package } from '../../../common/interfaces';
import { RedisService } from '../../../redis';
import { UserPackageAggregate } from '../../domains';
import { PackageError } from '../../errors';
import { IUserPackageWriteRepository } from '../../interfaces';
import { USER_PACKAGE_WRITE_REPOSITORY } from '../../package.constant';
import { PurchasePackageCommand } from '../impl';

@CommandHandler(PurchasePackageCommand)
export class PurchasePackageHandler implements ICommandHandler<PurchasePackageCommand, void> {
  constructor(
    @InjectPinoLogger(PurchasePackageHandler.name)
    private readonly logger: PinoLogger,
    @Inject(USER_PACKAGE_WRITE_REPOSITORY)
    private readonly repository: IUserPackageWriteRepository,
    private readonly publisher: EventPublisher,
    private readonly redis: RedisService,
  ) {}

  /**
   *
   * @param command
   */
  async execute(command: PurchasePackageCommand): Promise<void> {
    this.logger.trace(`BEGIN`);
    this.logger.info({ command });

    if (command.identity.package !== Package.STANDARD) {
      this.logger.warn('cannot purchase, already bought');
      throw new PackageError.AlreadyBought();
    }

    const userPackage = this.publisher.mergeObjectContext(
      UserPackageAggregate.create({
        userId: command.identity.id,
        package: command.package,
      }),
    );

    await this.repository.create(userPackage);
    await Promise.all([
      this.redis.delete(`user:query:${command.identity.id}`),
      this.redis.delete(`user:domain:${command.identity.id}`),
    ]);

    // fire the event
    userPackage.commit();

    this.logger.trace(`END`);
  }
}
