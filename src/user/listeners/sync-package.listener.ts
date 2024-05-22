import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SyncUserPackageEvent } from '../../package/domains/events/sync-package.event';
import { IUserWriteRepository } from '../interfaces';
import { USER_WRITE_REPOSITORY } from '../user.constant';

@EventsHandler(SyncUserPackageEvent)
export class SyncUserPackageListener implements IEventHandler<SyncUserPackageEvent> {
  constructor(
    @InjectPinoLogger(SyncUserPackageListener.name)
    private readonly logger: PinoLogger,
    @Inject(USER_WRITE_REPOSITORY)
    private readonly repository: IUserWriteRepository,
  ) {}

  /**
   *
   * @param event
   */
  async handle(event: SyncUserPackageEvent) {
    this.logger.trace(`BEGIN`);
    this.logger.info({ event });

    await this.repository.updatePackage(event.data.userId, event.data.package);

    this.logger.trace(`END`);
  }
}
