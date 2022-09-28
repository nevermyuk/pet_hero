import { HttpException, HttpStatus } from '@nestjs/common';

class UserDoesNotExistException extends HttpException {
  constructor() {
    super(`User does not exist. `, HttpStatus.FORBIDDEN);
  }
}

export default UserDoesNotExistException;
