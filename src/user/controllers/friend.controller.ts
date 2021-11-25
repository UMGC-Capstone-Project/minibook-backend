import { Controller, Get, NotImplementedException } from '@nestjs/common';
import { FriendsService } from '../services/friend.service';

@Controller({
    path: 'friends',
    version: '1',
})
export class FriendsController {

    constructor(
        private readonly friendService: FriendsService,
    ) { }

    @Get(':id/follow')
    follow() {
        return this.friendService.follow();
    }

    @Get(':id/unfollow')
    unfollow() {
        return this.friendService.unfollow();
    }

    @Get(':id/block')
    block() {
        return this.friendService.block();
    }

    @Get(':id/unblock')
    unblock() {
        return this.friendService.unblock();
    }
}