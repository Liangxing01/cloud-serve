import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Not } from 'typeorm';
import { Cloth } from '../../entity/cloth-info.entity';
import { CreateClothDto } from './dto/create-cloth.dto';

interface searchWhere {
  name?: any;
  type?: number;
  code?: any;
  combo?: number;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class ClothService {
  constructor(
    @InjectRepository(Cloth)
    private readonly clothRepository: Repository<Cloth>,
  ) {}
  // 所有的婚纱，供下拉框选择
  async getSelects() {
    return await this.clothRepository.find({
      select: ['id'],
      where: {
        deleteFlag: Not(0),
      },
    });
  }

  // 获取所有的客户
  async getAllCloths(query: searchWhere) {
    const { code, type, page, pageSize, combo } = query;
    const where: searchWhere = {};
    code && (where.code = Like(`%${code}%`));
    type && (where.type = type);
    combo && (where.combo = combo);

    const [list, total] = await this.clothRepository.findAndCount({
      select: ['code', 'imgCode', 'type', 'createDate', 'id', 'num', 'remark'],
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
  async post(data: CreateClothDto) {
    const { remark, type, imgCode, code, num } = data;
    const cloth = new CreateClothDto();
    cloth.code = code;
    cloth.type = type;
    cloth.imgCode = imgCode;
    cloth.num = num;
    cloth.totalNum = num;
    cloth.remark = remark;
    const result = await this.clothRepository.save(cloth);
    return result;
  }

  async update(id: number, data: CreateClothDto) {
    const info = await this.clothRepository.findOne(id);
    Object.assign(info, data);
    return this.clothRepository.save(info);
  }

  async getDetailByIds(ids: number[]) {
    return await this.clothRepository.find({
      where: ids.map((id) => ({ id })),
    });
  }

  async delete(id) {
    const info = await this.clothRepository.findOne(id);
    info.deleteFlag = 0;
    return this.clothRepository.save(info);
  }
}
