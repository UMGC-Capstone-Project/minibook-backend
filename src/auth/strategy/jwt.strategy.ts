import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationPayload } from '../dto/AuthenticationPayload';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: AuthenticationPayload): Promise<AuthenticationPayload> {
    return {
      user: {
        userId: payload.user.userId,
        displayName: payload.user.displayName,
        email: payload.user.email,
        avatar: payload.user.avatar,
        firstname: payload.user.firstname,
        lastname: payload.user.lastname
      },
      exp: payload.exp,
      iat: payload.iat
    };
  }
}
