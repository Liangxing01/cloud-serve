import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('account')
export class AccountController {
  constructor(private readonly userServer: AccountService) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async creeateOne(@Body() body) {
    await this.userServer.postUser(body);
    return '创建成功！';
  }

  @Post('update')
  async updateUser(@Body() body) {
    const { id, ...param } = body;
    await this.userServer.updateUser(id, param);
    return '更新成功！';
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async validateAccount(@Request() req) {
    return this.userServer.login(req.user);
  }
}
