import {
  Controller,
  Post,
  Body,
  Put,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { getManager } from 'typeorm';
import { OrderService } from './order.service';
import { ScheduleService } from '../schedule-manage/schedule.service';
import { transformAuthInfo } from 'passport';

@Controller('order')
export class ReserveController {
  constructor(
    private readonly reserveServer: OrderService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @HttpCode(200)
  @Post('list')
  async getAll(@Body() body) {
    const result = await this.reserveServer.getList(body);
    return result;
  }
  @HttpCode(200)
  @Post('add')
  async creeateOne(@Body() body) {
    const { clothIds, startTime, endTime, username, telphone, remark } = body;
    const arr = [];
    const scheArr = [];

    clothIds.split(',').forEach((c) => {
      arr.push(this.scheduleService.search(c, startTime, endTime));
      scheArr.push({
        username,
        telphone,
        clothId: c,
        startTime,
        endTime,
      });
    });

    await getManager().transaction(async (transactionalEntityManager) => {
      const hasOrder = await this.scheduleService.search(
        clothIds,
        startTime,
        endTime,
      );

      if (hasOrder) {
        throw new HttpException('下单失败，请查看档期表！已有衣服装档', 500);
      }

      console.log(scheArr, 'scheArr');
      await this.reserveServer.post(body);
      await this.scheduleService.post(scheArr);
    });
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
