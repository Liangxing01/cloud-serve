import { Controller, Post, Body } from '@nestjs/common';
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
}
