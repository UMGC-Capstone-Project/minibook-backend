import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationPayload } from '../dto/AuthenticationPayload';
import { AccessTokenPayload } from '../dto/AccessTokenPayload';
import { SentMessageInfo } from 'nodemailer';
import { UserResponseDto } from '../../user/dto/UserResponseDto';
import { isPasswordMatching } from '../../common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { User } from '../../user/services/users.service';
import { UserCreateRequestDto } from 'src/user/dto/UserCreateRequestDto';
import { UserLoginResponseDto } from '../dto/UserLoginResponseDto';
import { UserRecoveryResponseDto } from '../dto/UserRecoveryResponseDto';
import { UserRecoveryRequestDto } from '../dto/UserRecoveryRequestDto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserCreateResponseDto } from 'src/user/dto/UserCreateResponseDto';
import { triggerAsyncId } from 'async_hooks';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) { }

  public async register(data: UserCreateRequestDto): Promise<any> {
    if (await this.isUserExists(data.email))
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);

    const user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    const { password, ...result } = user;
    this.sendEmail(
      user.email,
      'index',
      'Welcome to MiniBook.io!',
      {
        username: user.displayname,
        code: 'cf1a3f828287',
      });
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

  // we don't really care if the email is there or not just always return sucessful => true.
  // this is more for security seeing that user(s) could be fishing for accounts.
  async recover(
    data: UserRecoveryRequestDto,
  ): Promise<UserRecoveryResponseDto> {
    const { email } = data;
    const response: UserRecoveryResponseDto = {
      successful: true,
    }
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) return response;
    this.sendEmail(
      user.email,
      'recover',
      'Recover MiniBook.io Account!',
      {
        displayName: user.displayname,
        email: user.email,
        code: 'cf1a3f828287',
      });
    return response;
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

  private createAuthenticationPayload(
    data: UserResponseDto,
  ): AuthenticationPayload {
    return {
      displayName: data.displayname,
      email: data.email,
      id: data.id,
    };
  }

  sendEmail(_email: string, _template: string, _subject: string, _context: { [name: string]: any; }) {
    this.mailerService
      .sendMail({
        to: _email,
        from: 'noreply@minibook.io',
        subject: _subject,
        template: process.cwd() + '/template/' + _template,
        context: _context,
      })
      .then((success) => console.log(success))
      .catch((err) => console.log(err));
  }
}
