import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserUpdateRequest } from './dto/user-update-request.dto';
import { UserEntity } from '../../entities/user.entity';
import { UserRequest } from '../../common/decorator';
import { JwtAuthGuard } from '../authentication/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  myProfile(@UserRequest() user) {
    return this.usersService.findOneByEmail(user.email);
  }

  @Get(':displayName')
  findOne(@Param('displayName') displayName: string): Promise<UserEntity> {
    return this.usersService.findOneByDisplayName(displayName);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userUpdateRequest: UserUpdateRequest) {
    return this.usersService.update(+id, userUpdateRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('friends/me')
  @UseGuards(JwtAuthGuard)
  getFriends(@UserRequest() user,) {
    return this.usersService.findFriends();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  sendFriendRequest() {

  }

  @Post()
  @UseGuards(JwtAuthGuard)
  responseToFriendRequest() {

  }

  @Get(':id/follow')
  @UseGuards(JwtAuthGuard)
  follow(@Param('id') id: string, @UserRequest() user) {
    return this.usersService.follow(+id, user);
  }


}
