import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from 'src/dto/UserCreateDto';
import { UserDto } from 'src/dto/UserDto';
import { UserEntity } from 'src/entity/user.entity';
import { toUserDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepository.findOne(options);
        console.log(options)
        console.log(user)
        return toUserDto(user);
    }

    findByLogin() {

    }

    findByPayload() {

    }

    async create(data: UserCreateDto): Promise<UserDto> {
        const { displayname, email, password } = data;

        const user = await this.userRepository.findOne({ where: { email: email } });

        if (user)
            throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);

        const newUser: UserEntity = this.userRepository.create({
            email: email,
            password: password,
            displayname: displayname,
        })

        await this.userRepository.save(newUser);

        return toUserDto(newUser);
    }
}
