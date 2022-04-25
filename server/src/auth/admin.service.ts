import { UserService } from './user.service';
import { UserStatus, UserRole } from './auth.enum';
import { User } from './user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from './token.service';
import { UserRepository } from './user.repository';
import * as config from 'config';
const jwtConfig = config.get('jwt');

@Injectable()
export class AdminService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokensService,
    private userRepository: UserRepository,
  ) {}

  async updateUserStatus(id: number, status: UserStatus): Promise<User> {
    const user = await this.userService.getUserById(id);
    user.status = status;
    await user.save();
    delete user.password;
    delete user.salt;
    return user;
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ) {
    let userRole: UserRole.ADMIN;
    const authObj = await this.userRepository.validatePasswordWithRole(
      authCredentialsDto,
      userRole,
    );
    const { id, username, role, profile } = authObj;
    if (!username) {
      throw new UnauthorizedException('Invalide credentials');
    }


    const token = await this.tokenService.generateAccessToken({ id, username, role } )
    const refresh = await this.tokenService.generateRefreshToken({ id, username, role } , jwtConfig.expiresIn * 100)

    return {id, accessToken: token, role: role, refreshToken: refresh, profile: profile};
  }
}
