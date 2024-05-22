import { Package } from '../../common/interfaces';
import { UserDomain } from '../domains';

export interface IUserWriteRepository {
  findById(id: string): Promise<UserDomain | undefined>;
  create(entity: UserDomain): Promise<void>;
  updatePackage(id: string, pkg: Package): Promise<void>;
}
