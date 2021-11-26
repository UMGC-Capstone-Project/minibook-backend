import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../common/constants/jwt.consts';
import { AuthenticationPayload } from '../dto/AuthenticationPayload';
import { JwtPayloadDto } from '../dto/JwtPayloadDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
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
