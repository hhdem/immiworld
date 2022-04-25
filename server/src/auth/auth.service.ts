import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { CommonService } from '../base/common.service';
import * as config from 'config';
import { TokensService } from './token.service';
import { AuthenticationPayload } from './auth.controller';
import { UserRole } from './auth.enum';
const jwtConfig = config.get('jwt');
const webConfig = config.get('web');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private commonService: CommonService,
    private tokenService: TokensService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      return this.userRepository.signUp(authCredentialsDto);
    } catch (error) {
      let msg = '';
      console.info(error);
      if (error instanceof ConflictException) {
        msg = await this.commonService.getI18NText(
          'exception.EXCEPTION.USERNAME_ALREADY_EXISTS',
        );
        throw new ConflictException(msg);
      } else if (error instanceof InternalServerErrorException) {
        msg = await this.commonService.getI18NText(
          'exception.EXCEPTION.INTERNAL_SERVER_ERROR',
        );
        throw new InternalServerErrorException(msg);
      } else if (error instanceof ForbiddenException) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    userRole?: UserRole,
  ) {
    const authObj = await this.userRepository.validatePasswordWithRole(
      authCredentialsDto,
      userRole,
    );
    if (!authObj) {
      throw new UnauthorizedException('Not found');
    }
    

    const { id, username, role, profile } = authObj;
    if (!username) {
      throw new UnauthorizedException('Invalide credentials');
    }

    const token = await this.tokenService.generateAccessToken({ id, username, role } )
    const refresh = await this.tokenService.generateRefreshToken({ id, username, role } , jwtConfig.expiresIn * 100)

    // const payload = this.buildResponsePayload(authObj, token, refresh);
    // profile.avatar.path = webConfig.staticPath+profile.avatar.path;
    return {id, accessToken: token, role: role, refreshToken: refresh, profile: profile};
  }

  // 生成 accesstoken refreshToken
  async genToken(payload: JwtPayload): Promise<any> {
    const accesstoken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: jwtConfig.expiresIn,
    });
    return { accesstoken, refreshToken };
  }

  public buildResponsePayload (user: { username: string; role: string; id: number}, accessToken: string, refreshToken?: string): AuthenticationPayload {
    return {
      user: user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      }
    }
  }
}
