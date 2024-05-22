import { ICommand } from '@nestjs/cqrs';
import { IIdentity } from '../../../common/interfaces';
import { DatingHistoryType } from '../../../user/user.constant';

class Props {
  readonly identity: IIdentity;
  readonly partnerId: string;
  readonly type: DatingHistoryType;
}

export class AddHistoryCommand extends Props implements ICommand {
  constructor(props: Props) {
    super();
    Object.assign(this, props);
  }
}
