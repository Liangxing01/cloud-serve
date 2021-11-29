import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { CustomLoggerService } from '../logger/logger.service';
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = {
          data,
          code: 0,
          msg: '请求成功',
        };

        this.doLog(context, res);
        return res;
      }),
    );
  }

  doLog(context: ExecutionContext, res): void {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const { url, headers, method, body } = request;
    const ua = headers['user-agent'];

    this.logger.info(
      `${method} ${url} ${ua} ${JSON.stringify(body)} ${JSON.stringify(res)}`,
    );
  }
}
