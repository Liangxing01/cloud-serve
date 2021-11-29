import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { CustomLoggerService } from 'logger/logger.service';
import { RolesGuard } from './guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TransformInterceptor(new CustomLoggerService()),
  );
  app.useGlobalGuards(new RolesGuard());
  await app.listen(8081);
}
bootstrap();
