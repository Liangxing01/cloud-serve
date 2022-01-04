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
      select: ['name', 'id'],
      where: {
        deleteFlag: Not(0),
      },
    });
  }

  // 获取所有的客户
  async getAllCloths(query: searchWhere) {
    const { name, type, page, pageSize, combo, code } = query;
    const where: searchWhere = {};
    name && (where.name = Like(`%${name}%`));
    type && (where.type = type);
    combo && (where.combo = combo);
    code && (where.code = Like(`%${code}%`));

    const [list, total] = await this.clothRepository.findAndCount({
      select: [
        'name',
        'code',
        'price',
        'combo',
        'imgCover',
        'imgCode',
        'type',
        'createDate',
        'id',
        'imgUrls',
        'remark',
      ],
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
    const {
      name,
      remark,
      type,
      imgCode,
      code,
      imgUrls,
      combo,
      imgCover,
      price,
    } = data;
    const cloth = new CreateClothDto();
    cloth.name = name;
    cloth.code = code;
    cloth.type = type;
    cloth.imgCode = imgCode;
    cloth.combo = combo;
    cloth.price = price;
    cloth.imgCover = imgCover;
    cloth.imgUrls = imgUrls;
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
