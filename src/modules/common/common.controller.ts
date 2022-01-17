import {
  Controller,
  Post,
  Get,
  Query,
  HttpCode,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from './common.service';

import { ossConfig } from '../../config/ali-oss.config';

const OSS = require('ali-oss');

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const oss_client = new OSS(ossConfig);

const compImg = async function (fileBuffer) {
  const compfile = await imagemin(fileBuffer, {
    destination: 'public/compressed-images',
    plugins: [imageminWebp({ quality: 75 })], // 压缩质量75%
  });
  return compfile;
};
@Controller('common')
export class CommonController {
  constructor(private readonly commonServer: CommonService) {}
  // 获取婚纱类型的枚举
  @Get('/enum-code')
  @HttpCode(200)
  async getWeddingTypes(@Query('enumCode') enumCode: string) {
    return await this.commonServer.findEnumByCode(enumCode);
  }

  @HttpCode(200)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async putFile(@UploadedFile() file) {
    const minFiles = compImg(file.buffer);

    const { url } = await oss_client.put(
      '/wedding/' + file.originalname,
      file.buffer,
    );
    return {
      code: 10000,
      message: 'success.ok',
      data: {
        url: url,
      },
    };
  }
}
