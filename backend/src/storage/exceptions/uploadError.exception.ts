import { HttpException, HttpStatus } from '@nestjs/common';

class FileUploadException extends HttpException {
  constructor() {
    super(
      `Unable to upload image, something went wrong...
    `,
      HttpStatus.REQUEST_TIMEOUT,
    );
  }
}

export default FileUploadException;
