import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Account } from '../entity/account.entity';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly userRepository: Repository<Account>,
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
  async postUser(data: CreateDto) {
    const { account, password } = data;
    const user = new CreateDto();
    user.account = account;
    user.password = password;
    const result = await this.userRepository.save(user);
    return result;
  }

  async updateUser(id: number, data: CreateDto) {
    const info = await this.userRepository.findOne(id);
    Object.assign(info, data);
    return this.userRepository.save(info);
  }

  async validateAccount(account: string, password: string) {
    const info = await this.userRepository.findOne({
      account,
    });

    if (info && info.password == password) {
      return info;
    }

    return null;
  }
}
