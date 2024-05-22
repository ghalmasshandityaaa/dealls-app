import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  PayloadTooLargeException,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpErrorResponse } from '../interfaces';
import { DateUtils } from '../utils';

@Catch(PayloadTooLargeException)
export class PayloadTooLargeExceptionFilter implements ExceptionFilter {
  catch(_: PayloadTooLargeException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.BAD_REQUEST).send({
      timestamp: DateUtils.toUnix(new Date()),
      ok: false,
      error: {
        code: 'request/payload-too-large',
      },
    } as HttpErrorResponse);
  }
}
