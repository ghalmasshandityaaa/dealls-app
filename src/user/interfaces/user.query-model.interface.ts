import { Package } from '../../common/interfaces';

export interface UserQueryModel {
  id: string;
  profile: string;
  fullName: string;
  username: string;
  password: string;
  package: Package;
  createdAt: Date;
  updatedAt: Date;
}
