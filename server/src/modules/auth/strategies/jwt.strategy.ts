import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import extractJwtFromCookie from '../util/extractJwtFromCookie';
import JwtPayload from '../dto/jwtPayload.dto';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookie]),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}

export default JwtStrategy;
