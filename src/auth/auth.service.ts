import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UserDto } from 'src/dto/UserDto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    // vaildation of the user should be done by jwt token.
    async validateUser(username: string, pass: string): Promise<any> {
        return username;
        // const user = await this.usersService.findOne(username);
        // if (user && user.password === pass) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, password: user.password, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async register(data: CreateUserDto): Promise<UserDto> {
        try {
            const newUser = await this.usersService.create(data);
            return newUser;
        } catch(error) {
            console.log("user creation issue");
        }
        
    }
}
