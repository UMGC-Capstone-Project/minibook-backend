import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationPayload } from 'src/dto/AuthenticationPayload';
import { AccessTokenPayload } from 'src/dto/AccessTokenPayload';
import { UserCreateDto } from 'src/dto/UserCreateDto';
import { UserDto } from 'src/dto/UserDto';
import { isPasswordMatching } from 'src/shared/utils';
import { UserEntity } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async isUserExists(email: string): Promise<boolean> {
        return !!await this.userRepository.findOne({ where: { email: email } });
    }

    public async register(data: UserCreateDto): Promise<any> {
        if(await this.isUserExists(data.email))
            throw new HttpException("user already exists", HttpStatus.BAD_REQUEST)

        const user = await this.userRepository.create(data)
        await this.userRepository.save(user)
        const { password, ...result } = user;
        return result;
    }

    // Local Strategy -> Validate User -> Login -> AccessTokenPayload
    public async login(user: any): Promise<AccessTokenPayload> { 

        const authenticationPayload = this.createAuthenticationPayload(user)
        const tokenPayload = await this.createToken(authenticationPayload)

        return {
            access_token: tokenPayload
        };
    }

    // ## Helpers ##
    public async validateUser(email: string, password: string): Promise<UserDto | null> {
        const user = await this.userRepository.findOne({where: {email: email}});

        if (user && await isPasswordMatching(user.password, password)) {
            const { password, newsboard, ...result }= user;
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
