import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../guard/auth.guard';
import { Roles } from '../../decorator/role.decorator';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userServer: UserService) {}

  @Get('list')
  async getAll(@Query() query) {
    const result = await this.userServer.getAllUsers(query);
    return result;
  }

  @Post('add')
  @Roles('admin')
  async creeateOne(@Body() body: CreateUserDto) {
    await this.userServer.postUser(body);
    return '创建成功！';
  }

  @Post('update')
  async updateUser(@Body() body) {
    const { id, ...param } = body;
    await this.userServer.updateUser(id, param);
    return '更新成功！';
  }

  @Put('delete')
  async put(@Body('id') id) {
    console.log(id, 'xxx');
    await this.userServer.deleteUser(id);
    return '删除成功！';
  }
}
