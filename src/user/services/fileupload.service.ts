import { Injectable } from '@nestjs/common';
import { AbstractWsAdapter } from '@nestjs/websockets';
import { S3Bucket } from '../interfaces/IS3Bucket';

import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { User } from './users.service';
import { UserEntity } from '../entities/user.entity';

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

    async upload(user: UserEntity, file: Express.Multer.File, acl: SUPPORTED_ACL_TYPE) {
        const results = await this.s3
            .upload({
                Bucket: this.publicBucket,
                Body: file.buffer,
                Key: `${uuid()}.${MIME_TYPE_MAP[file.mimetype]}`,
                ACL: acl,
            })
            .promise();

        return {
            filename: results.Key,
            location: results.Location,
        };
    }

    async uploads(user: UserEntity,files: Array<Express.Multer.File>,acl: SUPPORTED_ACL_TYPE,){
        const response = [];
        // we use a modern for loop here *forEach* had an issue resulting in a race condiction. 
        for (const file of files) {
            const result: PhotoResponseDto = {
                success: null
            }

            let params: S3.Types.PutObjectRequest = {
                Bucket: this.publicBucket,
                Body: file.buffer,
                Key: `${uuid()}.${MIME_TYPE_MAP[file.mimetype]}`,
                ACL: acl,
            }

            let options: ManagedUpload.ManagedUploadOptions = {}

            let upload = this.s3.upload(params, options).on('httpUploadProgress', (process) => {
                // TODO: figure out if we can transfer the progress back to the client some how this might require an websocket for progression transfer.
                console.log(process);
            }).promise()

            await upload.then((data: ManagedUpload.SendData) => {
                result.file = data.Key;
                result.location = data.Location;
                result.success = true;
            }, (err: Error) => {
                result.success = false;
            });

            response.push(result)
        }
        return response;
    }

    async uploadPublic(user: UserEntity, file: Express.Multer.File) {
        return await this.upload(user, file, SUPPORTED_ACL_TYPE.PUBLIC_READ);
    }
    async uploadPrivate(user: UserEntity, file: Express.Multer.File) {
        return await this.upload(user, file, SUPPORTED_ACL_TYPE.PRIVATE);
    }
    async uploadMultiPublic(user: UserEntity, files: Array<Express.Multer.File>) {
        return this.uploads(user, files, SUPPORTED_ACL_TYPE.PUBLIC_READ)
    }
    async uploadMultiPrivate(user: UserEntity, files: Array<Express.Multer.File>) {
        return this.uploads(user, files, SUPPORTED_ACL_TYPE.PRIVATE);
    }

    async manageAccess(location: string, acl: SUPPORTED_ACL_TYPE) {

    }
}

type PhotoResponseDto = {
    file?: string;
    location?: string;
    success: boolean;
}