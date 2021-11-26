import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRequest } from 'src/common/decorator';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateRequestDto } from 'src/common/dto/UserCreateRequestDto';
import { UserCreateResponseDto } from 'src/common/dto/UserCreateResponseDto';
import { UserEntity } from 'src/user/entities/user.entity';
import { BadRequestResponseDto } from '../dto/BadRequestDto';
import { UserLoginRequestDto } from '../dto/UserLoginRequestDto';
import { UserLoginResponseDto } from '../dto/UserLoginResponseDto';
import { UserRecoveryRequestDto } from '../dto/UserRecoveryRequestDto';
import { UserRecoveryResponseDto } from '../dto/UserRecoveryResponseDto';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('authenticate')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'The record has been not been successfully created.',
    type: BadRequestResponseDto,
  })
  async register(
    @Body() createUserDto: UserCreateRequestDto,
  ): Promise<UserEntity> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: UserLoginRequestDto,
  })
  @ApiResponse({ status: 200, type: UserLoginResponseDto })
  async login(
    @UserRequest() userRequest: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    return this.authService.login(userRequest);
  }

  @Post('recover')
  @HttpCode(200)
  @ApiResponse({status: 200, type: UserRecoveryResponseDto})
  recover(
    @Body() userRecoveryRequestDto: UserRecoveryRequestDto,
  ): Promise<UserRecoveryResponseDto> {
    return this.authService.recover(userRecoveryRequestDto);
  }
}
