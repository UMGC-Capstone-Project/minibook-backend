import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationPayload } from '../dto/AuthenticationPayload';
import { JwtPayloadDto } from '../dto/JwtPayloadDto';
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

  async validate(payload: JwtPayloadDto): Promise<AuthenticationPayload> {
    return {
      id: payload.id,
      displayName: payload.displayName,
      email: payload.email,
    };
  }
}
