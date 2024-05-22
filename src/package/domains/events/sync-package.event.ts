import { DomainEvent } from '../../../common/domains';
import { Package } from '../../../common/interfaces';

interface Props {
  userId: string;
  package: Package;
}

export class SyncUserPackageEvent extends DomainEvent<Props> {
  constructor(props: Props) {
    super(props);
  }
}
