import { Controller, Get, Post, Query, Body, Put } from '@nestjs/common';
import { ReserveService } from './reserve.service';

@Controller('reserve')
export class ReserveController {
  constructor(private readonly reserveServer: ReserveService) {}

  @Get('list')
  async getAll(@Query() query) {
    const result = await this.reserveServer.getList(query);
    return result;
  }

  @Post('add')
  async creeateOne(@Body() body) {
    await this.reserveServer.post(body);
    return '创建成功！';
  }

  @Post('update')
  async update(@Body() body) {
    const { id, ...param } = body;
    await this.reserveServer.update(id, param);
    return '更新成功！';
  }

  @Put('delete')
  async put(@Body('id') id) {
    console.log(id, 'xxx');
    await this.reserveServer.delete(id);
    return '删除成功！';
  }
}
