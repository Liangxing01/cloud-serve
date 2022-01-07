import {
  Controller,
  Post,
  Body,
  Put,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ScheduleService } from '../schedule-manage/schedule.service';

@Controller('order')
export class ReserveController {
  constructor(
    private readonly orderService: OrderService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @HttpCode(200)
  @Post('list')
  async getAll(@Body() body) {
    const result = await this.orderService.getList(body);
    return result;
  }
  @HttpCode(200)
  @Post('add')
  async creeateOne(@Body() body) {
    const { clothIds, startTime, endTime } = body;
    const hasOrder = await this.scheduleService.search(
      clothIds,
      startTime,
      endTime,
    );

    if (hasOrder) {
      throw new HttpException('下单失败，请查看档期表！已有衣服装档', 500);
    }
    await this.orderService.post(body);
    return '创建成功！';
  }

  @Post('update')
  async update(@Body() body) {
    const { id, ...param } = body;
    await this.orderService.update(id, param);
    return '更新成功！';
  }

  @Put('delete')
  async put(@Body('id') id) {
    console.log(id, 'xxx');
    await this.orderService.delete(id);
    return '删除成功！';
  }
}
