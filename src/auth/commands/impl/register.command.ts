import { ICommand } from '@nestjs/cqrs';

class Props {
  readonly profile: string;
  readonly fullName: string;
  readonly username: string;
  readonly password: string;
}

export class RegisterCommand extends Props implements ICommand {
  constructor(props: Props) {
    super();
    Object.assign(this, props);
  }
}
