import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../../redis';
import { UserDomain } from '../domains';
import {
  IUserReadRepository,
  IUserService,
  IUserWriteRepository,
  UserQueryModel,
} from '../interfaces';
import { USER_READ_REPOSITORY, USER_WRITE_REPOSITORY } from '../user.constant';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_READ_REPOSITORY)
    private readonly readRepository: IUserReadRepository,
    @Inject(USER_WRITE_REPOSITORY)
    private readonly writeRepository: IUserWriteRepository,
    private readonly redis: RedisService,
  ) {}

  async findById(id: string): Promise<UserQueryModel | undefined> {
    const key = `user:query:${id}`;
    const cached = await this.redis.get<UserQueryModel>(key);

    if (cached) {
      return cached;
    }

    const user = await this.readRepository.findById(id);
    if (user) {
      await this.redis.insert(key, JSON.stringify(user));
    }

    return user;
  }

  async findByIdDomain(id: string): Promise<UserDomain | undefined> {
    const key = `user:domain:${id}`;
    const cached = await this.redis.get<UserDomain>(key);

    if (cached) {
      return cached;
    }

    const user = await this.writeRepository.findById(id);
    if (user) {
      await this.redis.insert(key, JSON.stringify(user));
    }

    return user;
  }

  async findByUsername(username: string): Promise<UserQueryModel | undefined> {
    const key = `user:query:${username}`;
    const cached = await this.redis.get<UserQueryModel>(key);

    if (cached) {
      return cached;
    }

    const user = await this.readRepository.findByUsername(username);
    if (user) {
      await this.redis.insert(key, JSON.stringify(user));
    }

    return user;
  }

  async create(user: UserDomain): Promise<void> {
    await this.writeRepository.create(user);
  }
}
