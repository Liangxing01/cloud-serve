import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Schedule } from '../../entity/schedule.entity';
import { CreateDto } from './dto/create.dto';
import { Cloth } from '../../entity/cloth-info.entity';
import { User } from '../../entity/user.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly reserveRepository: Repository<Schedule>,
  ) {}

  // 获取所有的档期

  async getList(query) {
    const { page, pageSize, keywords = '', type } = query;
    console.log(type, 'type');
    const res = await this.reserveRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect(Cloth, 'cloth', 'cloth.id = schedule.clothId')
      .leftJoinAndSelect(User, 'user', 'user.userId = schedule.userId')
      .select(
        'schedule.id as id, user.userId as userId, user.name as username, cloth.id as clothId, cloth.name as clothName, cloth.code as clothCode, cloth.imgCode as imgCode, cloth.type as type, schedule.startTime as startTime, schedule.endTime as endTime',
      )
      .where('cloth.name LIKE :name OR user.name LIKE :username', {
        name: keywords,
        username: keywords,
      })
      .andWhere('cloth.type = :type', {
        type: type,
      })
      .offset((page - 1) * (pageSize - 0))
      .limit(pageSize - 0)
      .getRawMany();

    return {
      list: res,
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
