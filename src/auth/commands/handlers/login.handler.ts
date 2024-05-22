import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { TOKEN_SERVICE } from '../../../auth/auth.constant';
import { AuthError } from '../../../auth/errors';
import { ITokenService } from '../../../auth/interfaces';
import { StringUtils } from '../../../common/utils';
import { IUserService } from '../../../user/interfaces';
import { USER_SERVICE } from '../../../user/user.constant';
import { LoginCommand } from '../impl';
import { LoginResult } from '../results';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, LoginResult> {
  constructor(
    @InjectPinoLogger(LoginHandler.name)
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
  async execute(command: LoginCommand): Promise<LoginResult> {
    this.logger.trace(`BEGIN`);
    this.logger.info({ command });

    const user = await this.userService.findByUsername(command.username);
    if (!user) throw new AuthError.UserNotFound();

    const match = await StringUtils.compare(user.password, command.password);
    if (!match) throw new AuthError.InvalidCredentials();

    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken({ ...user }),
      this.tokenService.generateRefreshToken({ ...user }),
    ]);

    const result = new LoginResult(accessToken, refreshToken);

    this.logger.trace(`END`);
    return result;
  }
}
