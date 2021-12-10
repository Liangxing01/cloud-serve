import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysEnum } from '../../entity/sys_enum.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(SysEnum)
    private readonly enumTypeRepository: Repository<SysEnum>,
  ) {}

  async findEnumByCode(enumCode: string) {
    const result = await this.enumTypeRepository.find({
      select: ['label', 'value'],
      where: {
        enum_code: enumCode,
      },
    });
    return result;
  }
}
