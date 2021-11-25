import { Injectable } from '@nestjs/common';
import { AbstractWsAdapter } from '@nestjs/websockets';
import { S3Bucket } from '../interfaces/IS3Bucket';

import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

export enum SUPPORTED_ACL_TYPE {
  PRIVATE = 'private',
  PUBLIC_READ = 'public-read',
  PUBLIC_READ_WRITE = 'public-read-write',
  AUTHENTICATED_READ = 'authenticated-read',
  AWS_EXEC_READ = 'aws-exec-read',
  BUCKET_OWNER_READ = 'bucket-owner-read',
  BUCKET_OWNER_FULL_CONTROL = 'bucket-owner-full-control',
}

@Injectable()
export class FileUploadService extends S3Bucket {
  publicBucket: string;
  privateBucket: string;

  constructor() {
    super();
    this.publicBucket = 'minibook-images';
    // TODO: move out to nestjs config service
    console.log(process.env.S3_ENDPOINT);
    this.endpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);

    this.credentials = new AWS.Credentials({
      accessKeyId: process.env.S3_ACCESSKEY,
      secretAccessKey: process.env.S3_SECRET_ACCESSKEY,
    });

    this.s3 = new AWS.S3({
      endpoint: this.endpoint,
      credentials: this.credentials,
    });
  }

  getS3() {
    throw new Error('Method not implemented.');
  }

  async upload(
    file: Express.Multer.File,
    filename: string,
    acl: SUPPORTED_ACL_TYPE,
  ): Promise<{ filename: string; location: string }> {
    const results = await this.s3
      .upload({
        Bucket: this.publicBucket,
        Body: file.buffer,
        Key: `${uuid()}--${filename}.${MIME_TYPE_MAP[file.mimetype]}`,
        ACL: acl,
      })
      .promise();

    return {
      filename: results.Key,
      location: results.Location,
    };
  }

  async uploadPrivate(
    file: Express.Multer.File,
    filename: string,
  ): Promise<{ filename: string; location: string }> {
    return await this.upload(file, filename, SUPPORTED_ACL_TYPE.PUBLIC_READ);
  }

  async uploadPublic(
    file: Express.Multer.File,
    filename: string,
  ): Promise<{ filename: string; location: string }> {
    return await this.upload(file, filename, SUPPORTED_ACL_TYPE.PUBLIC_READ);
  }

  uploadMultiPublic() {
    throw new Error('Method not implemented.');
  }
  uploadMultiPrivate() {
    throw new Error('Method not implemented.');
  }
}
