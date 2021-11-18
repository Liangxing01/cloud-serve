import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entity/account.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), PassportModule],
  controllers: [AccountController],
  providers: [AccountService, LocalStrategy],
})
export class AccountModule {}
