import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as config from 'config';
import { RefreshTokenPayload } from './token.service';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: RefreshTokenPayload): Promise<User> {
    const { sub } = payload;
    console.info('payload', payload);
    const user = await this.userRepository.findOne({ id:sub });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
