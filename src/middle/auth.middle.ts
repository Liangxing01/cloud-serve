import { UnauthorizedException } from '@nestjs/common';

export const AuthMiddleware = (req, res, next) => {
  if (req.cookies.userInfo) {
    next();
  } else {
    throw new UnauthorizedException('账号登录信息已失效，请重新登录！');
  }
};
