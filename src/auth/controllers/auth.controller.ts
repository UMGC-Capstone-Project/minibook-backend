import { Controller, Post, UseGuards, Request, HttpCode, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserCreateDto } from 'src/common/dto/UserCreateDto';
import { UserLoginDto } from 'src/common/dto/UserLoginDto';
import { UserRequest } from 'src/shared/decorator';
import { AuthService } from '../services/auth.service';
import { UserRecoverDto } from '../dto/UserRecoverDto';
import { LocalAuthGuard } from '../guard';

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
    async login(@UserRequest() userRequest) {
        return this.authService.login(userRequest);
    }

    @Post('recover')
    recover(@Body() userRecoverDto: UserRecoverDto) {
        return this.authService.recover(userRecoverDto.email);
    }
}
