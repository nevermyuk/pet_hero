import { HttpException, HttpStatus } from '@nestjs/common';

class LoginFailException extends HttpException {
    constructor() {
        super(`"Login failed; Invalid user ID or password." `, HttpStatus.BAD_REQUEST);
    }
}

export default LoginFailException;
