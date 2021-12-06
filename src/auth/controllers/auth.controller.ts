import { Controller, Post, UseGuards, HttpCode, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRequest } from '../../common/decorator';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateRequestDto } from '../../user/dto/UserCreateRequestDto';
import { UserEntity } from '../../user/entities/user.entity';
import { BadRequestResponseDto } from '../dto/BadRequestDto';
import { UserLoginRequestDto } from '../dto/UserLoginRequestDto';
import { UserRecoveryRequestDto } from '../dto/UserRecoveryRequestDto';
import { UserRecoveryResponseDto } from '../dto/UserRecoveryResponseDto';
import { UserCreateResponseDto } from 'src/user/dto/UserCreateResponseDto';
import { AuthenticationResposne } from '../dto/AuthenticationResponse.';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('authenticate')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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
  ): Promise<UserCreateResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: UserLoginRequestDto,
  })
  @ApiResponse({ status: 200, type: AuthenticationResposne })
  async login(
    @UserRequest() userRequest: UserLoginRequestDto,
  ): Promise<AuthenticationResposne> {
    return this.authService.login(userRequest);
  }

  @Post('recover')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: UserRecoveryResponseDto })
  recover(
    @Body() userRecoveryRequestDto: UserRecoveryRequestDto,
  ): Promise<UserRecoveryResponseDto> {
    return this.authService.recover(userRecoveryRequestDto);
  }

  refresh() {

  }
}
