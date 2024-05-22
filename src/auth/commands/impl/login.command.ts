import { ICommand } from '@nestjs/cqrs';

class Props {
  readonly username: string;
  readonly password: string;
}

export class LoginCommand extends Props implements ICommand {
  constructor(props: Props) {
    super();
    Object.assign(this, props);
  }
}
