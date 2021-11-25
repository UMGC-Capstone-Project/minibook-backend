import { Controller, Get, NotImplementedException } from '@nestjs/common';

@Controller('friends')
export class FriendsController {


    @Get(':id/follow')
    follow() {
        throw new Error('Method not implemented.');
    }

    @Get(':id/unfollow')
    unfollow() {
        throw new Error('Method not implemented.');
    }

    @Get(':id/block')
    block() {
        throw new Error('Method not implemented.');
    }

    @Get(':id/unblock')
    unblock() {
        throw new Error('Method not implemented.');
    }
}
