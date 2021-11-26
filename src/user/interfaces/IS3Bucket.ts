import { Endpoint, S3, Credentials } from 'aws-sdk';

export abstract class S3Bucket {
  protected endpoint: Endpoint;
  protected s3: S3;
  protected credentials: Credentials;
  abstract uploadPublic(
    file: Express.Multer.File,
    filename: string,
  ): Promise<{ filename: string; location: string }>;
  // abstract uploadMultiPublic(files:  Array<Express.Multer.File>);
  abstract uploadMultiPublic(files:  Array<Express.Multer.File>)
  abstract uploadPrivate(
    file: Express.Multer.File,
    filename: string,
  ): Promise<{ filename: string; location: string }>;
  abstract uploadMultiPrivate(files:  Array<Express.Multer.File>);
  abstract getS3();
}
