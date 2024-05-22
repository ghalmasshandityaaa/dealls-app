import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserPackageAggregate } from '../domains';
import { TypeOrmUserPackageEntity } from '../entities';
import { IUserPackageWriteRepository } from '../interfaces';

export class UserPackageWriteRepository implements IUserPackageWriteRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(entity: UserPackageAggregate): Promise<void> {
    await this.dataSource
      .createEntityManager()
      .insert(TypeOrmUserPackageEntity, { id: entity.id, ...entity.props });
  }
}
