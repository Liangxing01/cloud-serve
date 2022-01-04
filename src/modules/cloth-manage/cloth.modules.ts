import { Module } from '@nestjs/common';
import { ClothController } from './cloth.controller';
import { ClothService } from './cloth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cloth } from '../../entity/cloth-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cloth])],
  controllers: [ClothController],
  providers: [ClothService],
  exports: [ClothService],
})
export class ClothModule {}
