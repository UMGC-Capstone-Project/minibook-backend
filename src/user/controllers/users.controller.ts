import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  HttpException,
  HttpStatus,
  UploadedFile,
  Post,
  UseInterceptors,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UserRequest } from '../../common/decorator';
import { UserResponseDto } from '../dto/UserResponseDto';
import { toAvatarDto, toUserFullDto } from '../../common/mapper';
import { UsersService } from '../services/users.service';
import { FriendsService } from '../services/friend.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

export class SampleDto {
  name: string;
}

@Controller({
  path: 'users',
  version: '1',
})
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly friendsService: FriendsService,
    @InjectQueue('email') private readonly emailQueue: Queue,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async index(@UserRequest() user): Promise<UserResponseDto> {
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const _user = await this.usersService.findById(user.user.userId);
    return toUserFullDto(_user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  async me(@UserRequest() user): Promise<UserResponseDto> {
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const _user = await this.usersService.findById(user.id);
    return toUserFullDto(_user);
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async addAvatar(
    @UserRequest() user,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if(!file){
      throw Error('no file passed')
    }
    const avatar = await this.usersService.addAvatar(user.user.userId, file);
    return toAvatarDto(avatar);
  }

  @Get('avatar/delete')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async deleteAvatar(@UserRequest() user) {
    return await this.usersService.deleteAvatar(user.id);
  }

  @Get(':displayName')
  @ApiParam({
    name: 'displayName',
    type: String,
  })
  async indexById(@Param('displayName') displayName): Promise<UserResponseDto> {
    const _user = await this.usersService.findByDisplayName(displayName);
    return toUserFullDto(_user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  async profile(@Param('id') params, @Request() req): Promise<any> {
    return req.user;
  }

  @Get(':id/follow')
  follow() {
    return this.friendsService.follow();
  }

  @Get(':id/unfollow')
  unfollow() {
    return this.friendsService.unfollow();
  }

  @Get(':id/block')
  block() {
    return this.friendsService.block();
  }

  @Get(':id/unblock')
  unblock() {
    return this.friendsService.unblock();
  }
}
