import { Controller, Request, Res, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { serviceConfig } from '../../config/service.config';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local-login'))
  @Post('login')
  async login(@Request() req, @Res() res) {
    if (req.user) {
      const { access_token } = await this.authService.login(req.user);
      const { cookieExpTime } = serviceConfig;
      res.cookie('userInfo', access_token, {
        expires: new Date(Date.now() + cookieExpTime),
        httpOnly: true,
      });
      res.end('登录成功！');
    } else {
      res.end('登录失败');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
