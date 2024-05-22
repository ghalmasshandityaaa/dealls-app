import { IQueryResult } from '@nestjs/cqrs';
import { UserQueryModel } from '../../interfaces';

export class RandomUserResult implements IQueryResult {
  public readonly user: UserQueryModel;

  constructor(user: UserQueryModel) {
    this.user = user;
  }
}
