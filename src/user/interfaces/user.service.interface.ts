import { UserDomain } from '../domains';
import { UserQueryModel } from './user.query-model.interface';

export interface IUserService {
  findByUsername(username: string): Promise<UserQueryModel | undefined>;
  findById(id: string): Promise<UserQueryModel | undefined>;
  findByIdDomain(id: string): Promise<UserDomain | undefined>;
  create(user: UserDomain): Promise<void>;
}
