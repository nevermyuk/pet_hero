import { UnsupportedMediaTypeException } from '@nestjs/common';

export function fileMimetypeFilter(...mimetypes: string[]) {
  return (
    req,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    // Allowed ext

    if (
      mimetypes.some((m) => file.mimetype.includes(m)) &&
      file.originalname.match(/\.(jpe?g|png)$/i)
    ) {
      callback(null, true);
    } else {
      callback(
        new UnsupportedMediaTypeException(
          `File type is not matching: ${mimetypes.join(', ')}`,
        ),
        false,
      );
    }
  };
}
