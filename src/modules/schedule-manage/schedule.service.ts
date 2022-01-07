import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Schedule } from '../../entity/schedule.entity';
import { CreateDto } from './dto/create.dto';
import { Cloth } from '../../entity/cloth-info.entity';

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
      .select(
        'schedule.id as id, username, cloth.id as clothId, cloth.name as clothName, cloth.code as clothCode, cloth.imgCode as imgCode, cloth.type as type, schedule.startTime as startTime, schedule.endTime as endTime',
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

    cIds.forEach((id) => {
      whereArrs = whereArrs.concat([
        {
          clothId: id,
          startTime: Between(startTime, endTime),
        },
        {
          clothId: id,
          endTime: Between(startTime, endTime),
        },
      ]);
    });

    return await this.reserveRepository.findOne({
      where: whereArrs,
    });
  }
}
