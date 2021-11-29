import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middle';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from 'account-manage/account.module';
import { CommonModule } from 'common/common.modules';
import { UserModule } from 'user-manage/user.module';
import { ClothModule } from 'cloth-manage/cloth.modules';
import { ReserveModule } from 'reserve-manage/reserve.module';
import { ScheduleModule } from 'schedule-manage/schedule.module';
import { LoggerModule } from 'logger/logger.module';

import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { SysEnum } from './entity/sys_enum.entity';
import { Cloth } from './entity/cloth-info.entity';
import { ReserveInfo } from 'entity/reserve.entity';
import { ScheduleInfo } from 'entity/schedule.entity';
import { Account } from 'entity/account.entity';

import { dbConfig } from './config/ali-oss.config';

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
      entities: [
        User,
        SysEnum,
        Cloth,
        ReserveInfo,
        ScheduleInfo,
        Account,
        Role,
      ],
      synchronize: true,
    }),
    AccountModule, // 账户相关
    CommonModule, // 公共接口：比如文件上传
    UserModule, // 客户相关
    ClothModule, // 婚纱相关
    ReserveModule, // 预约相关
    ScheduleModule, // 档期相关
    LoggerModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes();
  }
}
