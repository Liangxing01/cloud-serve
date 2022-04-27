import {
  Controller,
  Post,
  Body,
  Put,
  HttpCode,
  HttpException,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ScheduleService } from '../schedule-manage/schedule.service';
import { RoleGuard } from '../../guard/role.guard';
import { Roles } from '../../decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('order')
export class ReserveController {
  constructor(
    private readonly orderService: OrderService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @HttpCode(200)
  @Roles('admin')
  @Post('list')
  async getAll(@Body() body) {
    const result = await this.orderService.getList(body);
    return result;
  }
  @HttpCode(200)
  @Roles('admin')
  @Post('add')
  async creeateOne(@Body() body) {
    const { clothIds, startTime, endTime, telphone } = body;
    const hasOrder = await this.scheduleService.search(
      clothIds,
      startTime,
      endTime,
    );

    if (hasOrder.length) {
      throw new HttpException('下单失败，请查看档期表！已有衣服装档', 500);
    }
    await this.orderService.post(body);
    return '创建成功！';
  }

  @HttpCode(200)
  @Roles('admin')
  @Post('update')
  async update(@Body() body) {
    const { id, ...param } = body;
    const { clothIds, startTime, endTime, telphone } = body;
    let hasOrder = await this.scheduleService.search(
      clothIds,
      startTime,
      endTime,
    );

    hasOrder = hasOrder.filter((order) => order.telphone !== telphone);

    if (hasOrder.length) {
      const { username } = hasOrder[0];

      throw new HttpException(
        `编辑失败，请查看${username}的档期表！已有衣服装档`,
        500,
      );
    }

    await this.orderService.update(id, param);
    return '更新成功！';
  }
  @HttpCode(200)
  @Roles('admin')
  @Put('delete')
  async put(@Body('id') id) {
    console.log(id, 'xxx');
    await this.orderService.delete(id);
    return '删除成功！';
  }
  @HttpCode(200)
  @Get('detail')
  async detail(@Query('id') id) {
    return await this.orderService.getDetailById(id);
  }
}
