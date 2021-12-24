import {
  Controller,
  Request,
  Res,
  Post,
  UseGuards,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { serviceConfig } from '../../config/service.config';
@Controller('auth')
@UseGuards(AuthGuard('local-login'))
export class AuthController {
  static loginInfo = {};
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
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
      throw new HttpException(
        '账号密码不匹配!',
        HttpStatus.NON_AUTHORITATIVE_INFORMATION,
      );
    }
  }
}
