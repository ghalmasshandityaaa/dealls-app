import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from '../../../redis';
import { UserError } from '../../errors';
import { IUserReadRepository } from '../../interfaces';
import { USER_READ_REPOSITORY } from '../../user.constant';
import { RandomUserQuery } from '../impl';
import { RandomUserResult } from '../results';

@QueryHandler(RandomUserQuery)
export class RandomUserHandler implements IQueryHandler<RandomUserQuery, RandomUserResult> {
  constructor(
    @InjectPinoLogger(RandomUserHandler.name)
    private logger: PinoLogger,
    @Inject(USER_READ_REPOSITORY)
    private repository: IUserReadRepository,
    private redis: RedisService,
  ) {}

  /**
   *
   * @param query
   * @returns
   */
  async execute(query: RandomUserQuery): Promise<RandomUserResult> {
    this.logger.trace(`BEGIN`);
    this.logger.info({ query });

    const user = await this.repository.findRandom(query.id);
    if (!user) throw new UserError.NotFound();

    // set redis
    const key = `user:query:${user.id}`;
    await this.redis.insert(key, JSON.stringify(user));

    const result = new RandomUserResult(user);

    this.logger.trace(`END`);
    return result;
  }
}
