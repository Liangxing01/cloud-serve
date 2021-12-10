import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { ScheduleInfo } from '../../entity/schedule.entity';
import { CreateDto } from './dto/create.dto';

interface searchWhere {
  username?: any;
  time?: any;
  telphone?: any;
  page?: number;
  pageSize?: number;
  cIds?: any;
}

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleInfo)
    private readonly reserveRepository: Repository<ScheduleInfo>,
  ) {}

  // 获取所有的客户
  async getList(query: searchWhere) {
    const { page, pageSize, username, telphone, time, cIds } = query;
    const where: searchWhere = {};
    username && (where.username = Like(`%${username}%`));
    telphone && (where.telphone = Like(`%${telphone}%`));
    time && (where.time = Like(`%${time}%`));
    cIds && (where.cIds = Like(`%${cIds}%`));

    const [list, total] = await this.reserveRepository.findAndCount({
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
  // 新增婚纱
  async post(data: CreateDto) {
    const { remark, username, telphone, time, cIds } = data;
    const cloth = new CreateDto();
    cloth.username = username;
    cloth.telphone = telphone;
    cloth.time = time;
    cloth.cIds = cIds;
    cloth.remark = remark;
    const result = await this.reserveRepository.save(cloth);
    return result;
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
}
