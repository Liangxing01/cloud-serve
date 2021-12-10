import { Module } from '@nestjs/common';
import { ReserveController } from './reserve.controller';
import { ReserveService } from './reserve.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveInfo } from '../../entity/reserve.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReserveInfo])],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
