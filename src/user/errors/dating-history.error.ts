import { HttpException, HttpStatus } from '@nestjs/common';
import { HttpErrorResponse } from '../../common/interfaces';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DatingHistoryError {
  export class CannotTwice extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'history/cannot-twice',
          },
        } as HttpErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // cannot match with own user
  export class MatchOwnUser extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'history/match-own-user',
          },
        } as HttpErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // cannot match with own user
  export class TooManySwipes extends HttpException {
    constructor() {
      super(
        {
          ok: false,
          error: {
            code: 'history/too-many-swipes',
          },
        } as HttpErrorResponse,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
