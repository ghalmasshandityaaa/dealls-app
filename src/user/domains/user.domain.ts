import { hashSync } from 'bcrypt';
import { Entity } from '../../common/domains';
import { Package } from '../../common/interfaces';

type Props = {
  profile: string;
  fullName: string;
  username: string;
  password: string;
  package: Package;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProps = Omit<Props, 'createdAt' | 'updatedAt' | 'package'>;

/**
 *
 */
export class UserDomain extends Entity<Props, string> {
  constructor(props: Props, id?: string) {
    super(props, id);
  }

  /**
   *
   * @param props
   * @returns
   */
  public static create(props: CreateProps): UserDomain {
    const entity = new UserDomain({
      ...props,
      password: hashSync(props.password, 10),
      package: Package.STANDARD,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return entity;
  }

  /**
   *
   * @param props
   * @param id
   * @returns
   */
  public static rebuild(props: Props, id: string): UserDomain {
    return new UserDomain(props, id);
  }
}
