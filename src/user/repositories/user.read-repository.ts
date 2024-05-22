import { InjectDataSource } from '@nestjs/typeorm';
import { startOfDay } from 'date-fns';
import { DataSource } from 'typeorm';
import { TypeOrmUserEntity } from '../entities';
import { IUserReadRepository, UserQueryModel } from '../interfaces';

export class UserReadRepository implements IUserReadRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findById(id: string): Promise<UserQueryModel | undefined> {
    const user = await this.dataSource
      .createQueryBuilder(TypeOrmUserEntity, 'user')
      .where('user.id = :id', { id })
      .getOne();

    return user || undefined;
  }

  async findByUsername(username: string): Promise<UserQueryModel | undefined> {
    const user = await this.dataSource
      .createQueryBuilder(TypeOrmUserEntity, 'user')
      .where('user.username = :username', { username })
      .getOne();

    return user || undefined;
  }

  async findRandom(id: string): Promise<UserQueryModel | undefined> {
    const startToday = startOfDay(new Date());
    const subQuery = `select dh.partner_id from dating_history dh where dh.created_at >= '${startToday.toISOString()}'::timestamp`;

    const user = await this.dataSource
      .createQueryBuilder(TypeOrmUserEntity, 'user')
      .where('user.id != :id', { id })
      .andWhere(`user.id not in (${subQuery})`)
      .orderBy('RANDOM()')
      .getOne();

    return user || undefined;
  }
}
