import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, getConnection } from 'typeorm';
import { Order } from '../../entity/order.entity';
import { Schedule } from '../../entity/schedule.entity';
import { User } from '../../entity/user.entity';
import { CreateDto } from './order.dto';

interface searchWhere {
  keywords?: any;
  username?: any;
  time?: any;
  telphone?: any;
  page?: number;
  pageSize?: number;
  cIds?: any;
}

const getScheduleArr = (data) => {
  const { clothIds, startTime, endTime, username, telphone, time } = data;
  const scheArr = [];

  clothIds.split(',').forEach((c) => {
    scheArr.push({
      username,
      telphone,
      clothId: c,
      time,
      startTime,
      endTime,
    });
  });

  return scheArr;
};

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

  // 获取所有的订单
  async getList(query: searchWhere) {
    const { page, pageSize, keywords } = query;
    const where: searchWhere = {};
    keywords && (where.username = Like(`%${keywords}%`));

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
    const { username, telphone } = data;
    const scheArr = getScheduleArr(data);
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
    const { telphone, time } = info;
    const scheArr = getScheduleArr(data);
    try {
      const queryRunner = getConnection().createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await this.orderRepository
          .createQueryBuilder(null, queryRunner)
          .update(Order)
          .set(info)
          .where('id = :id', { id })
          .execute();

        await this.scheduleRepository
          .createQueryBuilder(null, queryRunner)
          .delete()
          .from(Schedule)
          .where('telphone = :telphone', { telphone })
          .andWhere('time = :time', { time })
          .execute();

        await this.scheduleRepository
          .createQueryBuilder(null, queryRunner)
          .insert()
          .into(Schedule)
          .values(scheArr)
          .execute();

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw new HttpException('更新订单失败！请稍后再试！', 500);
      }
    } catch (err) {
      throw new HttpException('服务器出错！', 500);
    }
  }

  async delete(id) {
    const info = await this.orderRepository.findOne(id);
    info.deleteFlag = 0;

    const { telphone, time } = info;

    try {
      const queryRunner = getConnection().createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await this.orderRepository
          .createQueryBuilder(null, queryRunner)
          .update(Order)
          .set(info)
          .where('id = :id', { id })
          .execute();

        await this.scheduleRepository
          .createQueryBuilder(null, queryRunner)
          .delete()
          .from(Schedule)
          .where('telphone = :telphone', { telphone })
          .andWhere('time = :time', { time })
          .execute();

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw new HttpException('删除订单失败！请稍后再试！', 500);
      }
    } catch (err) {
      throw new HttpException('服务器出错！', 500);
    }
  }

  async getDetailById(id) {
    return await this.orderRepository.findOne({
      id,
    });
  }
}
