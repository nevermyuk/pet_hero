import { HttpException, HttpStatus } from '@nestjs/common';

class ProfileAlreadyCreatedException extends HttpException {
  constructor() {
    super(`User already has a profile.`, HttpStatus.BAD_REQUEST);
  }
}

export default ProfileAlreadyCreatedException;
