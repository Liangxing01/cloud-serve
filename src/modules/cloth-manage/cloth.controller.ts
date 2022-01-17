import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  HttpCode,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { ClothService } from './cloth.service';
import { RoleGuard } from '../../guard/role.guard';
import { Roles } from '../../decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('cloth')
@UseGuards(RoleGuard)
export class ClothController {
  constructor(private readonly userServer: ClothService) {}

  @HttpCode(200)
  @Get('select')
  async getSelects() {
    return await this.userServer.getSelects();
  }

  @HttpCode(200)
  @Post('list')
  async getAll(@Body() body) {
    const result = await this.userServer.getAllCloths(body);
    return result;
  }
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Roles('admin')
  @Post('add')
  async creeateOne(@Body() body) {
    try {
      await this.userServer.post(body);
      return '创建成功！';
    } catch (err) {
      console.log(err);
      throw new HttpException('创建失败，请稍后再试', 500);
    }
  }
  @HttpCode(200)
  @Get('detail')
  async getDetail(@Query('id') ids) {
    const params = ids.split(',').map((id) => id - 0);
    return await this.userServer.getDetailByIds(params);
  }

  @HttpCode(200)
  @Post('update')
  async update(@Body() body) {
    const { id, ...param } = body;
    await this.userServer.update(id, param);
    return '更新成功！';
  }

  @HttpCode(200)
  @Put('delete')
  async put(@Body('id') id) {
    console.log(id, 'xxx');
    await this.userServer.delete(id);
    return '删除成功！';
  }
}
