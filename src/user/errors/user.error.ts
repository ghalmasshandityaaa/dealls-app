import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorResponse } from '../../common/interfaces';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserError {
  export class NotFound extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'user/not-found',
          },
        } as HttpErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
