import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationPayload } from '../../common/dto/AuthenticationPayload';
import { AccessTokenPayload } from '../../common/dto/AccessTokenPayload';

import { UserDto } from '../../common/dto/UserDto';
import { isPasswordMatching } from '../../common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { User } from '../../user/services/users.service';
import { UserCreateRequestDto } from 'src/common/dto/UserCreateRequestDto';
import { UserLoginResponseDto } from '../dto/UserLoginResponseDto';
import { UserRecoveryResponseDto } from '../dto/UserRecoveryResponseDto';
import { UserRecoveryRequestDto } from '../dto/UserRecoveryRequestDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async register(data: UserCreateRequestDto): Promise<any> {
    if (await this.isUserExists(data.email))
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);

    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    const { password, ...result } = user;
    return result;
  }

  // Local Strategy -> Validate User -> Login -> AccessTokenPayload
  public async login(user: any): Promise<UserLoginResponseDto> {
    const authenticationPayload = this.createAuthenticationPayload(user);
    const tokenPayload = await this.createToken(authenticationPayload);

    return {
      access_token: tokenPayload,
    };
  }

  async recover(
    data: UserRecoveryRequestDto,
  ): Promise<UserRecoveryResponseDto> {
    return {
      successful: false,
    };
  }

  // ## Helpers ##
  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (user && (await isPasswordMatching(user.password, password))) {
      const { password, newsposts, ...result } = user;
      return result;
    }
    return null;
  }

  async isUserExists(email: string): Promise<boolean> {
    return !!(await this.userRepository.findOne({ where: { email: email } }));
  }

  private async createToken(payload: AuthenticationPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  private createAuthenticationPayload(data: UserDto): AuthenticationPayload {
    return {
      displayName: data.displayname,
      email: data.email,
      id: data.id,
    };
  }
}
