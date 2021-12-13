import { UnauthorizedException } from '@nestjs/common';

export const AuthMiddleware = (req, res, next) => {
  if (req.cookies.userInfo) {
    next();
  } else {
    throw new UnauthorizedException();
  }
};
