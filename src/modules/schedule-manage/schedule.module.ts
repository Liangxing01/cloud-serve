import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleInfo } from '../../entity/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleInfo])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
