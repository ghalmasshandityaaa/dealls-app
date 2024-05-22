import { InjectDataSource } from '@nestjs/typeorm';
import { endOfDay, startOfDay } from 'date-fns';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';
import { TypeOrmDatingHistoryEntity } from '../entities';
import { IDatingHistoryWriteRepository } from '../interfaces';
import { DatingHistoryType } from '../user.constant';

export class DatingHistoryWriteRepository implements IDatingHistoryWriteRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async todayExist(userId: string, partnerId: string): Promise<boolean> {
    const today = new Date();
    const result = await this.dataSource
      .createQueryBuilder(TypeOrmDatingHistoryEntity, 'history')
      .where('history.userId = :userId', { userId })
      .andWhere('history.partnerId = :partnerId', { partnerId })
      .andWhere('history.createdAt BETWEEN :start AND :end', {
        start: startOfDay(today),
        end: endOfDay(today),
      })
      .getOne();

    return result ? true : false;
  }
  async create(userId: string, partnerId: string, type: DatingHistoryType): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(TypeOrmDatingHistoryEntity)
      .values({
        id: v4(),
        userId,
        partnerId,
        type,
        createdAt: new Date(),
      })
      .execute();
  }

  async countTodaySwipe(userId: string): Promise<number> {
    const today = new Date();
    const result = await this.dataSource
      .createQueryBuilder(TypeOrmDatingHistoryEntity, 'history')
      .where('history.userId = :userId', { userId })
      .andWhere('history.createdAt BETWEEN :start AND :end', {
        start: startOfDay(today),
        end: endOfDay(today),
      })
      .getCount();

    return result;
  }
}
