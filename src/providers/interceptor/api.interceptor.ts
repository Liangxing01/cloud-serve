import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiCode } from '../../enum/api-code.enum';

// 约定好的返回格式
interface Response<T> {
  code: number;
  msg: string;
  data: T;
}

@Injectable()
export class ApiInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: ApiCode.SUCCESS,
          msg: 'success',
          data,
        };
      }),
    );
  }
}