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
import { RoleGuard } from '../../guard/role.guard';
import { Roles } from '../../decorator/role.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class UserController {
  constructor(private readonly userServer: UserService) {}
  @Get('list')
  async getAll(@Query() query) {
    const result = await this.userServer.getAllUsers(query);
    return result;
  }
  @Roles('admin')
  @Post('add')
  async creeateOne(@Body() body: CreateUserDto) {
    await this.userServer.postUser(body);
    return '创建成功！';
  }
  @Roles('admin')
  @Post('update')
  async updateUser(@Body() body) {
    const { id, ...param } = body;
    await this.userServer.updateUser(id, param);
    return '更新成功！';
  }
  @Roles('admin')
  @Put('delete')
  async put(@Body('id') id) {
    console.log(id, 'xxx');
    await this.userServer.deleteUser(id);
    return '删除成功！';
  }
}
