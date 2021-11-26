import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from '../../common/dto/UserCreateDto';
import { UserDto } from '../../common/dto/UserDto';
import { toUserDto } from '../../common/mapper';
import { isPasswordMatching } from '../../common/utils';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { FileService } from './fileupload.service';

export type User = any;

const supportImageMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly fileUploadService: FileService,
  ) { }

  async create(userCreateDto: UserCreateDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.displayname = userCreateDto.displayname;
    user.email = userCreateDto.email;
    user.password = userCreateDto.password;
    return this.userRepository.save(user);
    // const { displayname, email, password } = data;
    // const isExists = await this.findByEmail(email);

    // if (isExists)
    //     throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);

    // const user = this.userRepository.create({
    //     displayname: displayname,
    //     email: email,
    //     password: password,
    // });

    // await this.userRepository.save(user);
    // return toUserDto(user);
  }

  async addAvatar(userId: number, file) {
    const avatar = await this.fileUploadService.addAvatar(userId, file);
    const user = await this.findById(userId)
    await this.userRepository.update(userId, {
      ...user,
      avatar
    });
    return avatar;
  }

  async deleteAvatar(userId: number) {
    const user = await this.findById(userId);
    const fileId = user.avatar?.id;
    if (fileId) {
      await this.userRepository.update(userId, {
        ...user,
        avatar: null
      });
      await this.fileUploadService.delete(fileId);
    }
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options);
    return toUserDto(user);
  }

  async findByPayload(email: string): Promise<UserDto> {
    return this.findOne({ where: { email: email } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async findByDisplayName(displayName: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { displayname: displayName },
    });
  }

  async findByLogin({ email, password }): Promise<UserDto> {
    const user = await this.findByEmail(email);
    console.log('findbyLogin: ' + email);
    if (!user)
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);

    if (!isPasswordMatching(user.password, password))
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);

    return toUserDto(user);
  }
}
