import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { StorageService } from '../storage/storage.service';
import { fileMimetypeFilter } from './file-upload.utils';

@Controller('media')
export class MediaController {
  private readonly logger = new Logger(MediaController.name);
  constructor(private storageService: StorageService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      },
      fileFilter: fileMimetypeFilter('image'),
    }),
  )
  async uploadMedia(@UploadedFile() file: Express.Multer.File) {
    this.logger.log({ fileName: file.filename }, 'Validating Image Upload');
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    const newFileName = `${name}-${randomName}${fileExtName}`;
    const uploadedFile = await this.storageService.save(
      'media/' + newFileName,
      file.mimetype,
      file.buffer,
      [{ filename: newFileName }],
    );
    const publicUrl = `https://storage.googleapis.com/${uploadedFile.bucket}/${uploadedFile.file.name}`;
    return { imageUrl: publicUrl };
  }

  // @Get('/:mediaId')
  // async downloadMedia(@Param('mediaId') mediaId: string, @Res() res: Response) {
  //   let storageFile: StorageFile;
  //   try {
  //     storageFile = await this.storageService.get('media/' + mediaId);
  //   } catch (e) {
  //     if (e.message.toString().includes('No such object')) {
  //       throw new NotFoundException('image not found');
  //     } else {
  //       throw new ServiceUnavailableException('internal error');
  //     }
  //   }
  //   res.setHeader('Content-Type', storageFile.contentType);
  //   res.setHeader('Cache-Control', 'max-age=60d');
  //   res.end(storageFile.buffer);
  // }
}
