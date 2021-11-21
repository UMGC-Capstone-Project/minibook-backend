import { Controller, Get, UseGuards, Request, Param, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard';
import { UserDto } from 'src/dto/UserDto';
import { toUserDto } from 'src/shared/mapper';
import { UsersService } from './users.service';

@Controller()
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) {}


    @Get(':id')
    async index(@Param() params): Promise<UserDto> {
        // returns current authenticated users newsboard infromation.
        const user = await this.usersService.findById(params.id);

        if(!user)
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);

        return toUserDto(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@Request() req): Promise<any> {
        return req.user;
    }
}
