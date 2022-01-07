import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, getConnection } from 'typeorm';
import { Order } from '../../entity/order.entity';
import { Schedule } from '../../entity/schedule.entity';
import { User } from '../../entity/user.entity';
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
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    const { clothIds, startTime, endTime, username, telphone } = data;
    const scheArr = [];

    clothIds.split(',').forEach((c) => {
      scheArr.push({
        username,
        telphone,
        clothId: c,
        startTime,
        endTime,
      });
    });

    try {
      const queryRunner = getConnection().createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await this.orderRepository
          .createQueryBuilder(null, queryRunner)
          .insert()
          .into(Order)
          .values(data)
          .execute();
        await this.scheduleRepository
          .createQueryBuilder(null, queryRunner)
          .insert()
          .into(Schedule)
          .values(scheArr)
          .execute();
        const user = await this.userRepository
          .createQueryBuilder(null, queryRunner)
          .where('user.telphone = :telphone', {
            telphone: telphone,
          })
          .getOne();

        if (!user) {
          await this.userRepository
            .createQueryBuilder(null, queryRunner)
            .insert()
            .into(User)
            .values({ name: username, telphone })
            .execute();
        }

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw new HttpException('添加订单失败！请稍后再试！', 500);
      }
    } catch (err) {
      throw new HttpException('服务器发生错误！', 500);
    }
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
