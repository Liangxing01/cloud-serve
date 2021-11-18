import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly userServer: AccountService) {}

  @Post('add')
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
  async validateAccount(@Body() body) {
    const { account, password } = body;

    const info = await this.userServer.validateAccount(account, password);

    if (info) {
      return '登录成功';
    }

    throw new UnauthorizedException('账号不匹配');
  }
}
