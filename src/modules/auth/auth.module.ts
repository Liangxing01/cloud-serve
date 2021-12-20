import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UsersModule } from '../users/users.module';
import { AccountModule } from 'modules/account-manage/account.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { serviceConfig } from '../../config/service.config';

const { cookieExpTime } = serviceConfig;
@Module({
  imports: [
    AccountModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: cookieExpTime / 1000 + 's',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
