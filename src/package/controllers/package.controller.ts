import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Identity } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';
import { IIdentity } from '../../common/interfaces';
import { PurchasePackageCommand } from '../commands';
import { PurchasePackageBodyDto } from '../dtos';

@UseGuards(JwtAuthGuard)
@Controller({
  path: 'packages',
})
export class PackageController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.OK)
  @Post('purchase')
  async purchase(@Identity() identity: IIdentity, @Body() body: PurchasePackageBodyDto) {
    const command = new PurchasePackageCommand({
      identity,
      package: body.package,
    });
    return await this.commandBus.execute(command);
  }
}
