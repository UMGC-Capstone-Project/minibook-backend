import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationPayload } from 'src/dto/AuthenticationPayload';
import { AccessTokenPayload } from 'src/dto/AccessTokenPayload';
import { UserCreateDto } from 'src/dto/UserCreateDto';
import { UserDto } from 'src/dto/UserDto';
import { UserLoginDto } from 'src/dto/UserLoginDto';
import { UsersService } from 'src/users/users.service';
import { isPasswordMatching } from 'src/shared/utils';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    // TODO: add error handling
    async register(data: UserCreateDto): Promise<UserDto> {
        return await this.usersService.create(data);
    }

    // TODO: add error handling
    async login(userLoginDto: UserLoginDto): Promise<AccessTokenPayload> {
        const user: UserDto = await this.usersService.findByLogin(userLoginDto);
        const authenticationPayload = this.createAuthenticationPayload(user)
        const tokenPayload = await this.createToken(authenticationPayload)

        return {
            access_token: tokenPayload
        };
    }

    // ## Helpers ##
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);

        if (user && await isPasswordMatching(user.password, password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    private async createToken(payload: AuthenticationPayload): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }

    private createAuthenticationPayload(data: UserDto): AuthenticationPayload {
        return {
            displayName: data.displayname,
            email: data.email,
            userId: data.id
        }
    }
}
