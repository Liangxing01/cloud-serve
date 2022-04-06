import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Brackets } from 'typeorm';
import { Schedule } from '../../entity/schedule.entity';
import { CreateDto } from './dto/create.dto';
import { Cloth } from '../../entity/cloth-info.entity';

const moment = require('moment');
@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly reserveRepository: Repository<Schedule>,
  ) {}

  // 获取所有的档期
  async getList(query) {
    const { page, pageSize, keywords = '', type, time } = query;
    const res = await this.reserveRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect(Cloth, 'cloth', 'cloth.id = schedule.clothId')
      .select(
        `schedule.id as id,
         schedule.username as username,
          schedule.startTime as startTime,
         schedule.endTime as endTime,
         schedule.time as time,
          cloth.id as clothId,
          cloth.name as clothName,
          cloth.code as clothCode,
          cloth.imgCode as imgCode,
          cloth.type as type
        `,
      )
      .where('cloth.name LIKE :name')
      .setParameters({
        name: '%' + keywords + '%',
      })
      .orWhere('schedule.username LIKE :username')
      .setParameters({
        username: '%' + keywords + '%',
      })
      .andWhere(
        new Brackets((qb) => {
          if (type) {
            qb.where('cloth.type = :type', { type });
          }

          if (time) {
            qb.where('schedule.time = :time', { time });
          }
        }),
      )
      .offset((page - 1) * (pageSize - 0))
      .limit(pageSize - 0)
      .getRawMany();

    return {
      list: res,
    };
  }
  // 新增档期表
  async post(data: CreateDto[]) {
    const arr = [];
    data.forEach((item) => {
      const { remark, username, telphone, startTime, endTime, clothId } = item;
      const cloth = new CreateDto();
      cloth.username = username;
      cloth.telphone = telphone;
      cloth.startTime = startTime;
      cloth.endTime = endTime;
      cloth.clothId = clothId;
      cloth.remark = remark;
      arr.push(this.reserveRepository.save(cloth));
    });
    await Promise.all(arr);
    return '插入成功';
  }

  async update(id: number, data: CreateDto) {
    const info = await this.reserveRepository.findOne(id);
    Object.assign(info, data);
    return this.reserveRepository.save(info);
  }

  async delete(id) {
    const info = await this.reserveRepository.findOne(id);
    info.deleteFlag = 0;
    return this.reserveRepository.save(info);
  }

  async search(clothId, startTime, endTime) {
    const cIds = clothId.split(',');
    let whereArrs = [];
    const end = moment(new Date(endTime), 'YYYY-M-D')
      .add(1, 'days')
      .format('YYYY-M-D');
    const sub = moment(new Date(startTime), 'YYYY-M-D')
      .subtract(1, 'days')
      .format('YYYY-M-D');

    console.log(typeof end, typeof sub, 'daus');

    cIds.forEach((id) => {
      whereArrs = whereArrs.concat([
        {
          clothId: id,
          startTime: Between(sub, end),
        },
        {
          clothId: id,
          endTime: Between(sub, end),
        },
      ]);
    });

    return await this.reserveRepository.find({
      where: whereArrs,
    });
  }
}
