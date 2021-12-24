import { Injectable } from '@nestjs/common';
import { AccountService } from 'modules/account-manage/account.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.accountService.validateAccount(username, pass);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const { username, uuid, roles, password } = user;

    const payload = { username, sub: uuid, roles, password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
