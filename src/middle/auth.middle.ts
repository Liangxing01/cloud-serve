import { UnauthorizedException } from '@nestjs/common';

export const AuthMiddleware = (req, res, next) => {
  console.log(req, 'res');
  if (req.path == '/auth/login' || req.cookies.userInfo) {
    next();
  } else {
    throw new UnauthorizedException();
  }
};
