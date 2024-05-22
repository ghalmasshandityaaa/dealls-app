import { UserPackageAggregate } from '../domains';

export interface IUserPackageWriteRepository {
  create(entity: UserPackageAggregate): Promise<void>;
}
