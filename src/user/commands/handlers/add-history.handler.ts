import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Package } from '../../../common/interfaces';
import { DatingHistoryError } from '../../../user/errors';
import { IDatingHistoryWriteRepository } from '../../../user/interfaces';
import { DATING_HISTORY_WRITE_REPOSITORY } from '../../../user/user.constant';
import { AddHistoryCommand } from '../impl';

@CommandHandler(AddHistoryCommand)
export class AddHistoryHandler implements ICommandHandler<AddHistoryCommand, void> {
  constructor(
    @InjectPinoLogger(AddHistoryHandler.name)
    private readonly logger: PinoLogger,
    @Inject(DATING_HISTORY_WRITE_REPOSITORY)
    private readonly writeRepository: IDatingHistoryWriteRepository,
  ) {}

  /**
   *
   * @param command
   */
  async execute(command: AddHistoryCommand): Promise<void> {
    this.logger.trace(`BEGIN`);
    this.logger.info({ command });

    if (command.identity.id === command.partnerId) {
      throw new DatingHistoryError.MatchOwnUser();
    }

    const [exist, total] = await Promise.all([
      this.writeRepository.todayExist(command.identity.id, command.partnerId),
      this.writeRepository.countTodaySwipe(command.identity.id),
    ]);

    if (exist) {
      throw new DatingHistoryError.CannotTwice();
    } else if (command.identity.package !== Package.NO_QUOTA) {
      if (total >= 10) throw new DatingHistoryError.TooManySwipes();
    }

    await this.writeRepository.create(command.identity.id, command.partnerId, command.type);

    this.logger.trace(`END`);
  }
}
