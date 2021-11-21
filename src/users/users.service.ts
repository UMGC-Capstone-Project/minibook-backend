import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UserDto } from 'src/dto/UserDto';
import { UserEntity } from 'src/entity/user.entity';
import { toUserDto } from 'src/shared/mapper';
import { Repository } from 'typeorm';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'doe'
        },
        {
            userId: 2,
            username: 'jane',
            password: 'doe'
        }
    ]

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userRepository.findOne(options);
        return toUserDto(user);
    }

    findByLogin() {

    }

    findByPayload() {

    }

    async create(data: CreateUserDto): Promise<UserDto> {
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
