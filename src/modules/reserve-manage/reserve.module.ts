import { Module } from '@nestjs/common';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserve } from '../../entity/reserve.entity';
import { User } from '../../entity/user.entity';
import { SysEnum } from '../../entity/sys_enum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserve, User, SysEnum])],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
