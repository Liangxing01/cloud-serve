import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysEnum } from '../entity/sys_enum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysEnum])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
