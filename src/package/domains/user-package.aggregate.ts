import { Aggregate } from '../../common/domains';
import { Package } from '../../common/interfaces';
import { SyncUserPackageEvent } from './events/sync-package.event';

type Props = {
  userId: string;
  package: Package;
  createdAt: Date;
};

export type CreateProps = Omit<Props, 'createdAt'>;

/**
 *
 */
export class UserPackageAggregate extends Aggregate<Props, string> {
  constructor(props: Props, id?: string) {
    super(props, id);
  }

  /**
   *
   * @param props
   * @returns
   */
  public static create(props: CreateProps): UserPackageAggregate {
    const entity = new UserPackageAggregate({
      ...props,
      createdAt: new Date(),
    });

    entity.raise(
      new SyncUserPackageEvent({
        userId: entity.props.userId,
        package: entity.props.package,
      }),
    );

    return entity;
  }

  /**
   *
   * @param props
   * @param id
   * @returns
   */
  public static rebuild(props: Props, id: string): UserPackageAggregate {
    return new UserPackageAggregate(props, id);
  }
}
