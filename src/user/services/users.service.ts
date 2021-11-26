import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from '../dto/UserResponseDto';
import { toUserDto } from '../../common/mapper';
import { isPasswordMatching } from '../../common/utils';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserCreateRequestDto } from '../dto/UserCreateRequestDto';
import { FileService } from '../../file/services/file.service';

export type User = any;

const supportImageMimeTypes = ['image/jpg', 'image/jpeg', 'image/png'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly fileUploadService: FileService,
  ) {}

  async create(userCreateDto: UserCreateRequestDto): Promise<UserEntity> {
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
    const user = await this.userRepository.findOne(userId);
    await this.userRepository.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  async deleteAvatar(userId: number) {
    const user = await this.userRepository.findOne(userId);
    const fileId = user.avatar?.id;
    if (fileId) {
      await this.userRepository.update(userId, {
        ...user,
        avatar: null,
      });
      await this.fileUploadService.delete(fileId);
    }
  }

  async findOne(options?: object): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(options);
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return toUserDto(user);
  }

  async findByPayload(email: string): Promise<UserResponseDto> {
    return this.findOne({ where: { email: email } });
  }

  async findByEmail(email: string): Promise<UserResponseDto> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async findByDisplayName(displayName: string): Promise<UserResponseDto> {
    return await this.userRepository.findOne({
      where: { displayname: displayName },
    });
  }

  async findByLogin({ email, password }): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user)
      throw new HttpException('user not found', HttpStatus.UNAUTHORIZED);

    if (!isPasswordMatching(user.password, password))
      throw new HttpException('invalid credentials', HttpStatus.UNAUTHORIZED);

    return toUserDto(user);
  }

  // async getUser(userId: number) {
  //   const user  = await this.findById(userId);
  //   return toUserDto(user);
  // }
}
