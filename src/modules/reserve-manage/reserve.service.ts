import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not, getConnection } from 'typeorm';
import { Reserve } from '../../entity/reserve.entity';
import { CreateDto } from './dto/create.dto';
import { User } from '../../entity/user.entity';

interface searchWhere {
  keywords?: any;
  time?: any;
  page?: number;
  pageSize?: number;
  username?: any;
  telphone?: any;
  date?: any;
}

@Injectable()
export class ReserveService {
  constructor(
    @InjectRepository(Reserve)
    private readonly reserveRepository: Repository<Reserve>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 获取所有的客户
  async getList(query: searchWhere) {
    const { page, pageSize, keywords, time } = query;
    const where: searchWhere = {};
    keywords && (where.username = Like(`%${keywords}%`));
    time && (where.date = Like(`%${time}%`));

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
    const { remark, username, telphone, time, wxName, type, date } = data;
    const cloth = new CreateDto();
    cloth.username = username;
    cloth.telphone = telphone;
    cloth.time = time;
    cloth.wxName = wxName;
    cloth.remark = remark;
    cloth.type = type;
    cloth.date = date;
    try {
      const queryRunner = getConnection().createQueryRunner();

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        await this.reserveRepository
          .createQueryBuilder(null, queryRunner)
          .insert()
          .into(Reserve)
          .values(cloth)
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
        throw new HttpException('预约失败！请稍后再试！', 500);
      }
    } catch (err) {
      throw new HttpException('服务器发生错误！', 500);
    }
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
