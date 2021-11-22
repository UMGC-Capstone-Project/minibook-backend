import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  HttpException,
  HttpStatus,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UserRequest } from '../../common/decorator';
import { UserDto } from '../../common/dto/UserDto';
import { toUserDto } from '../../common/mapper';
import { UsersService } from '../services/users.service';

@Controller({
  path: 'users',
  version: '1'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async index(@UserRequest() user): Promise<any> {
    console.log('index: ' + JSON.stringify(user));

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    // const _user = await this.usersService.findById(user.id);
    // const _newsboard = _user.newsboard.posts;
    return user;
  }

  @Get(':id')
  async indexById(@Param() params): Promise<UserDto> {
    console.log('index :id: ' + params);
    // returns current authenticated users newsboard infromation.
    const user = await this.usersService.findById(params.id);

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return toUserDto(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/profile')
  async profile(@Request() req): Promise<any> {
    console.log(req.user);
    return req.user;
  }
}
