import { Controller, Post, UseGuards, Request, HttpCode, Body } from '@nestjs/common';
import { UserCreateDto } from 'src/dto/UserCreateDto';
import { UserLoginDto } from 'src/dto/UserLoginDto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    async register(@Body() createUserDto: UserCreateDto) {
        this.authService.register(createUserDto);
    }

    // @HttpCode(200)
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Body() userLoginDto: UserLoginDto) {
        console.log(userLoginDto)
        return this.authService.login(userLoginDto);
    }
}
