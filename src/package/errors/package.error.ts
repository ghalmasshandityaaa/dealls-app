import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorResponse } from '../../common/interfaces';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PackageError {
  export class AlreadyBought extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'package/already-bought',
          },
        } as HttpErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
