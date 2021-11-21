import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserLoginDto } from 'src/dto/UserLoginDto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(data: UserLoginDto): Promise<any> {
        console.log(data)
        const user = await this.authService.validateUser(data);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}