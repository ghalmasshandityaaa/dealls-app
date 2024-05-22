import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand, RegisterCommand } from '../commands';
import { LoginBodyDto, RegisterBodyDto } from '../dtos';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async register(@Body() body: RegisterBodyDto) {
    const command = new RegisterCommand(body);
    return await this.commandBus.execute(command);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginBodyDto) {
    const command = new LoginCommand(body);
    return await this.commandBus.execute(command);
  }
}
