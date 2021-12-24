import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          if (!request.cookies.userInfo) {
            throw new UnauthorizedException('账号信息已过期, 请重新登录');
          }
          return request.cookies.userInfo;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { sub, username, roles, password } = payload;

    if (!sub || !username || !roles || !password) {
      throw new UnauthorizedException('账号登录信息失效，请重新登录');
    }

    return { userId: sub, username, roles, password };
  }
}
