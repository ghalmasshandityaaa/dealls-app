import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorResponse } from '../../common/interfaces';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthError {
  export class UsernameTaken extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'auth/username-taken',
          },
        } as HttpErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  export class EmailTaken extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'auth/email-taken',
          },
        } as HttpErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  export class UserNotFound extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'auth/user-not-found',
          },
        } as HttpErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  export class ExpiredToken extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'auth/expired-token',
          },
        } as HttpErrorResponse,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  export class InvalidCredentials extends HttpException {
    constructor(code?: number) {
      super(
        {
          ok: false,
          error: {
            code: 'auth/invalid-credentials',
          },
        } as HttpErrorResponse,
        code || HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
