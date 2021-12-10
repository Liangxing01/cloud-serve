import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'), //使用ExtractJwt.fromHeader从header获取token
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, //使用密钥解析，可以使用process.env.xxx
    } as StrategyOptions);
  }

  //token验证, payload是super中已经解析好的token信息
  async validate(payload: any) {
    console.log(payload);
    return { username: payload.username };
  }
}
