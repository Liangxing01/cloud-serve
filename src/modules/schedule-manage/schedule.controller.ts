import { Controller, Post, Body, Put, HttpCode } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly reserveServer: ScheduleService) {}

  @HttpCode(200)
  @Post('list')
  async getAll(@Body() body) {
    const result = await this.reserveServer.getList(body);
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
