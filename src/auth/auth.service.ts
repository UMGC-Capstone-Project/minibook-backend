import { ConsoleLogger, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from 'src/dto/UserCreateDto';
import { UserDto } from 'src/dto/UserDto';
import { UserLoginDto } from 'src/dto/UserLoginDto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    // vaildation of the user should be done by jwt token.
    async validateUser(data: UserLoginDto): Promise<any> {
        console.log("validateUser: " + data);
        const { email } = data;
        console.log(email)
        const user = await this.usersService.findOne({ email: data });
        if (user) {
            return user;
        }
        return null;
    }

    async login(user: UserLoginDto) {
        console.log(user);
        const payload = { email: user.email, password: user.password, sub: 1 };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(data: UserCreateDto): Promise<UserDto> {
        console.log(data);
        try {
            const newUser = await this.usersService.create(data);
            return newUser;
        } catch (error) {
            console.log("hello")
            throw new HttpException(error, 200);
        }

    }
}
