import { Module, Global } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService, LocalStrategy, JwtStrategy],
  exports: [AccountService, JwtModule],
})
export class AccountModule {}
