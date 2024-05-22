import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { HttpResponse } from '../interfaces';
import { DateUtils } from '../utils';

@Injectable()
export class ResponseEnvelopeInterceptor<T> implements NestInterceptor<T, HttpResponse<T>> {
  intercept(_: ExecutionContext, next: CallHandler): Observable<HttpResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        timestamp: DateUtils.toUnix(new Date()),
        ok: true,
        ...data,
      })),
    );
  }
}
