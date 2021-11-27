import { HttpException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Repository } from 'typeorm';
import { PublicFileEntity } from '../entities/public-file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Bucket } from '../classes/S3Bucket';
import { ConfigService } from '@nestjs/config';

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
export class FileService extends S3Bucket {
  bucketEndpoint: string;

  constructor(
    @InjectRepository(PublicFileEntity)
    private readonly publicFileRepository: Repository<PublicFileEntity>,
    private readonly configService: ConfigService,
  ) {
    super();
    this.bucketEndpoint = this.configService.get<string>('s3.bucketEndpoint');
    this.endpoint = new AWS.Endpoint(
      this.configService.get<string>('s3.endpoint'),
    );
    this.credentials = new AWS.Credentials({
      accessKeyId: this.configService.get<string>('s3.accessKey'),
      secretAccessKey: this.configService.get<string>('s3.secretKey'),
    });

    this.s3 = new AWS.S3({
      endpoint: this.endpoint,
      credentials: this.credentials,
    });
  }

  getS3(user: number) {
    throw new Error('Method not implemented.');
  }

  async addAvatar(userId: number, file) {
    const results = await this.uploadPublic(userId, file);
    const newFile = this.publicFileRepository.create({
      key: results.Key,
      url: results.Location,
    });
    await this.publicFileRepository.save(newFile);
    return newFile;
  }

  // TODO: We might combine this into just one function upload(s).
  async upload(
    userId: number,
    file: Express.Multer.File,
    acl: SUPPORTED_ACL_TYPE,
  ) {
    if (!file) throw new HttpException('no file has been sent', 400);
    const params: S3.Types.PutObjectRequest = this.createS3UploadParams(
      userId,
      file,
      acl,
    );
    return await this.s3.upload(params).promise();
  }

  createUserFilePath(userId: number) {
    return `${userId}/Photos`;
  }

  createS3UploadParams(
    userId: number,
    fileBuffer,
    acl,
  ): S3.Types.PutObjectRequest {
    const params: S3.Types.PutObjectRequest = {
      Bucket: this.bucketEndpoint,
      Body: fileBuffer.buffer,
      Key: `${this.createUserFilePath(userId)}/${uuid()}.${
        MIME_TYPE_MAP[fileBuffer.mimetype]
      }`,
      ACL: acl,
    };
    return params;
  }

  createS3DeleteParams(fileKey): S3.Types.PutObjectRequest {
    const params: S3.Types.PutObjectRequest = {
      Bucket: this.bucketEndpoint,
      Key: `${fileKey}`,
    };
    return params;
  }

  async uploads(
    userId: number,
    files: Array<Express.Multer.File>,
    acl: SUPPORTED_ACL_TYPE,
  ) {
    if (files.length < 1) throw new HttpException('no file has been sent', 400);
    const response = [];
    // we use a modern for loop here *forEach* had an issue resulting in a race condiction.
    for (const file of files) {
      const result: PhotoResponseDto = {
        success: null,
      };
      const params: S3.Types.PutObjectRequest = this.createS3UploadParams(
        userId,
        file,
        acl,
      );
      const options: ManagedUpload.ManagedUploadOptions = {};
      const upload = this.s3
        .upload(params, options)
        .on('httpUploadProgress', (process) => {
          // TODO: figure out if we can transfer the progress back to the client some how this might require an websocket for progression transfer.
          console.log(process);
        })
        .promise();

      await upload.then(
        (data: ManagedUpload.SendData) => {
          result.key = data.Key;
          result.url = data.Location;
          result.success = true;
        },
        (err: Error) => {
          result.success = false;
        },
      );

      response.push(result);
    }
    return response;
  }

  async uploadPublic(userId: number, file: Express.Multer.File) {
    return await this.upload(userId, file, SUPPORTED_ACL_TYPE.PUBLIC_READ);
  }
  async uploadPrivate(userId: number, file: Express.Multer.File) {
    return await this.upload(userId, file, SUPPORTED_ACL_TYPE.PRIVATE);
  }
  async uploadMultiPublic(userId: number, files: Array<Express.Multer.File>) {
    return this.uploads(userId, files, SUPPORTED_ACL_TYPE.PUBLIC_READ);
  }
  async uploadMultiPrivate(userId: number, files: Array<Express.Multer.File>) {
    return this.uploads(userId, files, SUPPORTED_ACL_TYPE.PRIVATE);
  }

  async manageAccess(location: string, acl: SUPPORTED_ACL_TYPE) {
    throw Error('....');
  }

  async delete(fileId: number) {
    const response = {
      success: false,
    };
    const file = await this.publicFileRepository.findOne(fileId);
    if (file) {
      const paramas = this.createS3DeleteParams(file.key);
      await this.s3.deleteObject(paramas).promise();
      response.success = true;
    }
    return response;
  }
}

type PhotoResponseDto = {
  key?: string;
  url?: string;
  success: boolean;
};
