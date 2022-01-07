import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './middle/auth.middle';

import { AccountModule } from 'modules/account-manage/account.module';
import { CommonModule } from 'modules/common/common.modules';
import { UserModule } from 'modules/user-manage/user.module';
import { ClothModule } from 'modules/cloth-manage/cloth.modules';
import { ReserveModule } from 'modules/reserve-manage/reserve.module';
import { ScheduleModule } from 'modules/schedule-manage/schedule.module';
import { OrderModule } from 'modules/order/order.module';

import { UserController } from 'modules/user-manage/user.controller';

import { dbConfig } from './config/ali-oss.config';
import { AuthModule } from './modules/auth/auth.module';

const { host, username, password, database } = dbConfig;
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port: 3306,
      username,
      password,
      database,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    AccountModule, // 账户相关
    CommonModule, // 公共接口：比如文件上传
    UserModule, // 客户相关
    ClothModule, // 婚纱相关
    ReserveModule, // 预约相关
    ScheduleModule, // 档期相关
    AuthModule,
    OrderModule, // 订单相关
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
