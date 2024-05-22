import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { TOKEN_SERVICE } from '../../../auth/auth.constant';
import { AuthError } from '../../../auth/errors';
import { ITokenService } from '../../../auth/interfaces';
import { UserDomain } from '../../../user/domains';
import { IUserService } from '../../../user/interfaces';
import { USER_SERVICE } from '../../../user/user.constant';
import { RegisterCommand } from '../impl';
import { RegisterResult } from '../results/register.result';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand, RegisterResult> {
  constructor(
    @InjectPinoLogger(RegisterHandler.name)
    private readonly logger: PinoLogger,
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: ITokenService,
  ) {}

  /**
   *
   * @param command
   */
  async execute(command: RegisterCommand): Promise<RegisterResult> {
    this.logger.trace(`BEGIN`);
    this.logger.info({ command });

    const user = await this.userService.findByUsername(command.username);
    if (user) {
      throw new AuthError.UsernameTaken();
    }

    const auth = UserDomain.create(command);
    await this.userService.create(auth);

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken({ id: auth.id, package: auth.props.package }),
      this.tokenService.generateRefreshToken({ id: auth.id, package: auth.props.package }),
    ]);

    const result = new RegisterResult(accessToken, refreshToken);

    this.logger.trace(`END`);
    return result;
  }
}
