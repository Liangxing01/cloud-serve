import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { User } from '../../entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

type params = {
  name?: any;
  deleteFlag: any;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // 获取所有的客户
  async getAllUsers(query) {
    const { keywords, page, pageSize } = query;
    const where: params = { deleteFlag: Not(0) };

    if (keywords) {
      where.name = Like(`%${keywords}%`);
    }

    const [list, total] = await this.userRepository.findAndCount({
      where: where,
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

  async getDetailByIds(ids: number[]) {
    return await this.userRepository.find({
      where: ids.map((id) => ({ userId: id })),
    });
  }

  async deleteUser(id) {
    const info = await this.userRepository.findOne(id);
    info.deleteFlag = 0;
    return this.userRepository.save(info);
  }
}
