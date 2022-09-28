import { HttpException, HttpStatus } from '@nestjs/common';

class UserAlreadyExistException extends HttpException {
  constructor() {
    super(`User already exists. `, HttpStatus.FORBIDDEN);
  }
}

export default UserAlreadyExistException;
