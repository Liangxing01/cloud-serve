import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Order } from '../../entity/order.entity';
import { CreateDto } from './order.dto';

interface searchWhere {
  username?: any;
  time?: any;
  telphone?: any;
  page?: number;
  pageSize?: number;
  cIds?: any;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  // 获取所有的客户
  async getList(query: searchWhere) {
    const { page, pageSize, username, telphone, time, cIds } = query;
    const where: searchWhere = {};
    username && (where.username = Like(`%${username}%`));
    telphone && (where.telphone = Like(`%${telphone}%`));
    time && (where.time = Like(`%${time}%`));
    cIds && (where.cIds = Like(`%${cIds}%`));

    const [list, total] = await this.orderRepository.findAndCount({
      where: {
        deleteFlag: Not(0),
        ...where,
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
  // 新增订单
  async post(data: CreateDto) {
    const {
      remark,
      username,
      telphone,
      time,
      clothIds,
      startTime,
      endTime,
      price,
    } = data;
    const cloth = new CreateDto();
    cloth.username = username;
    cloth.telphone = telphone;
    cloth.time = time;
    cloth.clothIds = clothIds;
    cloth.remark = remark;
    cloth.startTime = startTime;
    cloth.endTime = endTime;
    cloth.price = price;
    await this.orderRepository.save(cloth);
    return '添加成功！';
  }

  async update(id: number, data: CreateDto) {
    const info = await this.orderRepository.findOne(id);
    Object.assign(info, data);
    return this.orderRepository.save(info);
  }

  async delete(id) {
    const info = await this.orderRepository.findOne(id);
    info.deleteFlag = 0;
    return this.orderRepository.save(info);
  }
}
