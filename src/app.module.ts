import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from 'modules/account-manage/account.module';
import { CommonModule } from 'modules/common/common.modules';
import { UserModule } from 'modules/user-manage/user.module';
import { ClothModule } from 'modules/cloth-manage/cloth.modules';
import { ReserveModule } from 'modules/reserve-manage/reserve.module';
import { ScheduleModule } from 'modules/schedule-manage/schedule.module';

import { User } from './entity/user.entity';
import { Role } from './entity/role.entity';
import { SysEnum } from './entity/sys_enum.entity';
import { Cloth } from './entity/cloth-info.entity';
import { ReserveInfo } from 'entity/reserve.entity';
import { ScheduleInfo } from 'entity/schedule.entity';
import { Account } from 'entity/account.entity';

import { dbConfig } from './config/ali-oss.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

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
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
