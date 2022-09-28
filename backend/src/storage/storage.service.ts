import { StorageFile } from './storage-file';
import { DownloadResponse, Storage } from '@google-cloud/storage';
import { Injectable, Logger } from '@nestjs/common';
import FileUploadException from './exceptions/uploadError.exception';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GOOGLE_STORAGE_PROJECT_ID,
      credentials: {
        client_email: process.env.GOOGLE_STORAGE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_STORAGE_PRIVATE_KEY.replace(
          /\\n/g,
          '\n',
        ),
      },
    });

    this.bucket = process.env.GOOGLE_STORAGE_MEDIA_BUCKET;
  }

  async save(
    path: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[],
  ) {
    this.logger.log({ path }, 'Uploading to Cloud Storage');
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream({ public: true });
    stream
      .on('error', () => {
        throw new FileUploadException();
      })
      .on('finish', async () => {
        await file.setMetadata({
          metadata: object,
        });
      });
    stream.end(media);
    return { bucket: this.bucket, file };
  }

  async delete(path: string) {
    this.logger.log({ path }, 'Deleting from Cloud Storage');
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StorageFile> {
    this.logger.log({ path }, 'Downloading from Cloud Storage');
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {
    const [metadata] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(
      Object.entries(metadata || {}),
    );
    storageFile.contentType = storageFile.metadata.get('contentType');
    return storageFile;
  }
}
