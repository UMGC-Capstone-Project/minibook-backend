import { Endpoint, S3, Credentials } from 'aws-sdk';
import { UserEntity } from '../entities/user.entity';
import { SUPPORTED_ACL_TYPE } from '../services/fileupload.service';

export abstract class S3Bucket {
  protected endpoint: Endpoint;
  protected s3: S3;
  protected credentials: Credentials;
  abstract upload(user: UserEntity, file: Express.Multer.File, acl: SUPPORTED_ACL_TYPE);
  abstract uploads(user: UserEntity, files: Array<Express.Multer.File>, acl: SUPPORTED_ACL_TYPE);
  abstract uploadPublic(user: UserEntity, file: Express.Multer.File);
  abstract uploadPrivate(user: UserEntity, file: Express.Multer.File);
  abstract uploadMultiPublic(user: UserEntity, files: Array<Express.Multer.File>)
  abstract uploadMultiPrivate(user: UserEntity, files: Array<Express.Multer.File>);
  abstract getS3();
}
