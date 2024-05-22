import { Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Identity } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';
import { IIdentity } from '../../common/interfaces';
import { AddHistoryCommand } from '../commands';
import { BaseIdParamDto } from '../dtos';
import { RandomUserQuery } from '../queries';
import { DatingHistoryType } from '../user.constant';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'users',
})
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(':id/like')
  async register(@Identity() identity: IIdentity, @Param() param: BaseIdParamDto) {
    const command = new AddHistoryCommand({
      identity,
      partnerId: param.id,
      type: DatingHistoryType.LIKE,
    });
    return await this.commandBus.execute(command);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':id/pass')
  async login(@Identity() identity: IIdentity, @Param() param: BaseIdParamDto) {
    const command = new AddHistoryCommand({
      identity,
      partnerId: param.id,
      type: DatingHistoryType.PASS,
    });
    return await this.commandBus.execute(command);
  }

  @HttpCode(HttpStatus.OK)
  @Get('random')
  async random(@Identity() identity: IIdentity) {
    const command = new RandomUserQuery({
      id: identity.id,
    });
    return await this.queryBus.execute(command);
  }
}
