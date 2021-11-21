import { Controller, Post, UseGuards, Request, HttpCode, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        this.authService.register(createUserDto);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
