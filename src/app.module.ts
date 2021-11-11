import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middle';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiInterceptor } from 'providers/interceptor/api.interceptor';

import { CommonModule } from 'common/common.modules';
import { UserModule } from 'user-manage/user.module';
import { ClothModule } from 'cloth-manage/cloth.modules';
import { ReserveModule } from 'reserve-manage/reserve.module';

import { User } from './entity/user.entity';
import { SysEnum } from './entity/sys_enum.entity';
import { Cloth } from './entity/cloth-info.entity';
import { ReserveInfo } from 'entity/reserve.entity';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiInterceptor,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'lx123456',
      database: 'yunjian',
      entities: [User, SysEnum, Cloth, ReserveInfo],
      synchronize: true,
    }),
    CommonModule,
    UserModule,
    ClothModule,
    ReserveModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
