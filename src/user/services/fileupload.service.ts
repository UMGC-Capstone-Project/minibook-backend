import { Injectable } from '@nestjs/common';
import { AbstractWsAdapter } from '@nestjs/websockets';
import { S3Bucket } from '../interfaces/IS3Bucket';
import * as AWS from 'aws-sdk';
import { Endpoint, S3, Credentials } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};

@Injectable()
export class FileUploadService extends S3Bucket{
    publicBucket: string;
    privateBucket: string;

    constructor() {
        super();
        this.publicBucket = 'minibook-images';
        // TODO: move out to nestjs config service
        this.endpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);

        this.credentials = new AWS.Credentials({
            accessKeyId: process.env.S3_ACCESSKEY,
            secretAccessKey: process.env.S3_SECRET_ACCESSKEY
        })

        this.s3 = new AWS.S3({
            endpoint: this.endpoint,
            credentials: this.credentials,
        })
    }

    getS3() {
        throw new Error('Method not implemented.');
    }

    async uploadPublic(file: Express.Multer.File, filename: string): Promise<{ filename: string; location: string; }>{
        const results = await this.s3.upload({
            Bucket: this.publicBucket,
            Body: file.buffer,
            Key: `${uuid()}--${filename}.${MIME_TYPE_MAP[file.mimetype]}`,
            ACL: 'public-read'
        }).promise();

        return {
            filename: results.Key,
            location: results.Location
        }
    }

    uploadPrivate(file: Express.Multer.File, filename: string): Promise<{ filename: string; location: string; }> {
        throw new Error('Method not implemented.');
    }

    uploadMultiPublic() {
        throw new Error('Method not implemented.');
    }
    uploadMultiPrivate() {
        throw new Error('Method not implemented.');
    }

}
