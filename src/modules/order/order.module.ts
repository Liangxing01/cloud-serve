import { Module } from '@nestjs/common';
import { ReserveController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../entity/order.entity';
import { Schedule } from '../../entity/schedule.entity';
import { User } from '../../entity/user.entity';
import { ScheduleModule } from '../schedule-manage/schedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Schedule, User]), ScheduleModule],
  controllers: [ReserveController],
  providers: [OrderService],
})
export class OrderModule {}
