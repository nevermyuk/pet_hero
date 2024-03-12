import { HttpException, HttpStatus } from '@nestjs/common';

class LogoutFailException extends HttpException {
  constructor() {
    super(`Logout failed. `, HttpStatus.BAD_REQUEST);
  }
}

export default LogoutFailException;
