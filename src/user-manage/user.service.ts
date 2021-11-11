import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // 获取所有的客户
  async getAllUsers(query) {
    const { keywords, page, pageSize, telphone } = query;
    const [list, total] = await this.userRepository.findAndCount({
      where: {
        deleteFlag: Not(0),
        name: Like(`%${keywords}%`),
        telphone: Like(`%${telphone}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createDate: 'DESC',
      },
    });
    return {
      list,
      total,
    };
  }
  // 新增某个客户
  async postUser(data: CreateUserDto) {
    const { telphone, name, remark } = data;
    const user = new CreateUserDto();
    user.telphone = telphone;
    user.name = name;
    user.remark = remark;
    const result = await this.userRepository.save(user);
    return result;
  }

  async updateUser(id: number, data: CreateUserDto) {
    const info = await this.userRepository.findOne(id);
    Object.assign(info, data);
    return this.userRepository.save(info);
  }

  async deleteUser(id) {
    const info = await this.userRepository.findOne(id);
    info.deleteFlag = 0;
    return this.userRepository.save(info);
  }
}
