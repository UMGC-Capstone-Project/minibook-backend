import { Injectable } from '@nestjs/common';
import { AbstractWsAdapter } from '@nestjs/websockets';
import { S3Bucket } from '../interfaces/IS3Bucket';

import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Repository } from 'typeorm';
import { PublicFileEntity } from '../entities/public-file.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

// TODO: Fix the DTO return objects
//      Configuration Services

@Injectable()
export class FileService extends S3Bucket {
    bucketEndpoint: string;

    constructor(
        @InjectRepository(PublicFileEntity)
        private readonly publicFileRepository: Repository<PublicFileEntity>,
    ) {
        super();
        this.bucketEndpoint = 'minibook-images';
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

    getS3(user: number) {
        throw new Error('Method not implemented.');
    }

    async addAvatar(userId: number, file) {
        const results = await this.uploadPublic(userId, file)
        const newFile = this.publicFileRepository.create({
            key: results.Key,
            url: results.Location
        })
        await this.publicFileRepository.save(newFile);
        return newFile;
    }

    // TODO: We might combine this into just one function upload(s).
    async upload(userId: number, file: Express.Multer.File, acl: SUPPORTED_ACL_TYPE) {
        let params: S3.Types.PutObjectRequest = this.createS3UploadParams(userId, file, acl);
        return await this.s3.upload(params).promise();
    }

    createUserFilePath(userId: number) {
        return `${userId}/Photos`
    }

    createS3UploadParams(userId: number, fileBuffer, acl): S3.Types.PutObjectRequest {
        let params: S3.Types.PutObjectRequest = {
            Bucket: this.bucketEndpoint,
            Body: fileBuffer.buffer,
            Key: `${this.createUserFilePath(userId)}/${uuid()}.${MIME_TYPE_MAP[fileBuffer.mimetype]}`,
            ACL: acl,
        }
        return params;
    }

    createS3DeleteParams(fileKey): S3.Types.PutObjectRequest {
        let params: S3.Types.PutObjectRequest = {
            Bucket: this.bucketEndpoint,
            Key: `${fileKey}`
        }
        return params;
    }

    async uploads(userId: number, files: Array<Express.Multer.File>, acl: SUPPORTED_ACL_TYPE,) {
        const response = [];
        // we use a modern for loop here *forEach* had an issue resulting in a race condiction. 
        for (const file of files) {
            const result: PhotoResponseDto = {
                success: null
            }
            let params: S3.Types.PutObjectRequest = this.createS3UploadParams(userId, file, acl);
            let options: ManagedUpload.ManagedUploadOptions = {}
            let upload = this.s3.upload(params, options).on('httpUploadProgress', (process) => {
                // TODO: figure out if we can transfer the progress back to the client some how this might require an websocket for progression transfer.
                console.log(process);
            }).promise()

            await upload.then((data: ManagedUpload.SendData) => {
                result.key = data.Key;
                result.url = data.Location;
                result.success = true;
            }, (err: Error) => {
                result.success = false;
            });

            response.push(result)
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
        return this.uploads(userId, files, SUPPORTED_ACL_TYPE.PUBLIC_READ)
    }
    async uploadMultiPrivate(userId: number, files: Array<Express.Multer.File>) {
        return this.uploads(userId, files, SUPPORTED_ACL_TYPE.PRIVATE);
    }

    async manageAccess(location: string, acl: SUPPORTED_ACL_TYPE) {

    }
    
    async delete(){
        const paramas = this.createS3DeleteParams('2/Photos/8cedbf62-a603-493f-8cbc-c387a82d928f.jpg')
        const results = await this.s3.deleteObject(paramas).promise();
        return {};
    }
}

type PhotoResponseDto = {
    key?: string;
    url?: string;
    success: boolean;
}