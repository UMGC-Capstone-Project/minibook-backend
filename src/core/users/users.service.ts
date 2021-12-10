import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserUpdateRequest } from './dto/user-update-request.dto';
import { UserEntity } from '../../entities/user.entity';
import { AuthUserRegistrationRequest } from '../authentication/dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  findFriends() {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) { }

  create(userRegistrationDto: AuthUserRegistrationRequest): Promise<UserEntity> {
    const { displayname, email, firstname, lastname, password } = userRegistrationDto;
    const _user = new UserEntity();
    _user.displayname = displayname;
    _user.email = email;
    _user.firstname = firstname;
    _user.lastname = lastname;
    _user.password = password;

    return this.userRepository.save(_user);
  }

  // maybe handle error handling here?
  findOneByOptions(options?: object): Promise<UserEntity> {
    return this.userRepository.findOne(options);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOneById(id: number): Promise<UserEntity> {
    return this.findOneByOptions({ where: { id: id } });
  }

  findOneByEmail(email: string): Promise<UserEntity> {
    return this.findOneByOptions({ where: { email } });
  }

  findOneByDisplayName(displayname: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { displayname: displayname, isPublished: true } });
  }

  async update(id: number, userUpdateRequest: UserUpdateRequest): Promise<UserEntity> {
    await this.userRepository.update(id, userUpdateRequest);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<UserEntity> {
    const _user = await this.findOneById(id);
    return this.userRepository.remove(_user)
  }
}
