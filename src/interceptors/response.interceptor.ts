import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

export interface Response<T> {
  status: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data: T) => ({
        status:
          response.statusCode >= HttpStatus.BAD_REQUEST
            ? response.statusCode
            : 0,
        message:
          response.statusCode >= HttpStatus.BAD_REQUEST
            ? response.message
            : 'success',
        data,
      })),
      catchError((err) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        const errorResponse = {
          status: statusCode,
          message: err.message || 'Internal server error.',
          data: null,
        };
        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
