import { Controller, Post, UseGuards, Request, HttpCode, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserCreateDto } from 'src/dto/UserCreateDto';
import { UserLoginDto } from 'src/dto/UserLoginDto';
import { UserRequest } from 'src/shared/decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    async register(@Body() createUserDto: UserCreateDto) {
        return this.authService.register(createUserDto);
    }


    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    async login(@UserRequest() user) {
        return this.authService.login(user);
    }

    @Post('recover')
    recover(email: string) {
        throw new Error('Method not implemented.');
    }
}
