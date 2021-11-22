import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotImplementedException, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UserRequest } from '../../common/decorator';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {

    constructor(
        private readonly feedService: FeedService,
    ) { }

    @Get('/')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    index(@UserRequest() user) {
        return this.feedService.findByAuthor(user.id)
    }

    @Post()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    create(@Body() newsPost, @UserRequest() user) {
        return this.feedService.create(newsPost, user);
    }

    @Put(':id')
    update() {
        throw new Error('Method not implemented.');
    }

    @Delete(':id')
    delete() {
        throw new Error('Method not implemented.');
    }

}