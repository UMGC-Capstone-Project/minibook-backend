import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard';

@Controller()
export class UsersController {

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async profile(@Request() req): Promise<any> {
        return req.user;
    }
}
