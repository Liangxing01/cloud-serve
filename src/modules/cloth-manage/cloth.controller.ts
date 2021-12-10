import { Controller, Get, Post, Query, Body, Put, Param } from '@nestjs/common';
import { ClothService } from './cloth.service';

@Controller('cloth')
export class ClothController {
  constructor(private readonly userServer: ClothService) {}

  @Get('select')
  async getSelects() {
    return await this.userServer.getSelects();
  }

  @Get('list')
  async getAll(@Query() query) {
    const result = await this.userServer.getAllCloths(query);
    return result;
  }

  @Post('add')
  async creeateOne(@Body() body) {
    await this.userServer.post(body);
    return '创建成功！';
  }

  @Get('detail')
  async getDetail(@Query('id') ids) {
    const params = ids.split(',').map((id) => id - 0);
    return await this.userServer.getDetailByIds(params);
  }

  @Post('update')
  async update(@Body() body) {
    const { id, ...param } = body;
    await this.userServer.update(id, param);
    return '更新成功！';
  }

  @Put('delete')
  async put(@Body('id') id) {
    console.log(id, 'xxx');
    await this.userServer.delete(id);
    return '删除成功！';
  }
}
