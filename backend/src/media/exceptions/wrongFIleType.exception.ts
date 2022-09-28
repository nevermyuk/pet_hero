import { HttpException, HttpStatus } from '@nestjs/common';

class WrongFileTypeException extends HttpException {
  constructor() {
    super(
      `Wrong File type, only jpg,jpeg,png allowed.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export default WrongFileTypeException;
