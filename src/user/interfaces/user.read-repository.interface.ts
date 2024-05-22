import { UserQueryModel } from './user.query-model.interface';

export interface IUserReadRepository {
  findById(id: string): Promise<UserQueryModel | undefined>;
  findByUsername(username: string): Promise<UserQueryModel | undefined>;
  findRandom(id: string): Promise<UserQueryModel | undefined>;
}
