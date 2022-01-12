import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middle/request.log';
import { ResponseInterceptor } from './interceptor/responese.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.use(cookieParser());

  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(8081);
}
bootstrap();
