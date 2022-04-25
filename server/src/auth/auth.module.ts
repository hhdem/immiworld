import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { BaseModule } from '../base/base.module';
import { AdminController } from './admin.controller';
import { UserService } from './user.service';
import { AdminService } from './admin.service';
import { TokensService } from './token.service';
import { RefreshTokensRepository } from './refresh-token.repository';
import { UserController } from './user.controller';
import { UploadService } from '../file/upload.service';
import { PhotoRepository } from '../file/photo.repository';
import { ProfileRepository } from './profile.repository';
import { UserOnlineService } from './user-online.service';
import { UserOnlineRepository } from './user-online.repository';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt',session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    TypeOrmModule.forFeature([UserRepository, RefreshTokensRepository, PhotoRepository, ProfileRepository, UserOnlineRepository]),
    BaseModule,
  ],
  controllers: [AuthController, AdminController, UserController],
  providers: [AuthService, JwtStrategy, UserService, AdminService, TokensService, UploadService, UserOnlineService],
  exports: [JwtStrategy, PassportModule, UserService],
})
export class AuthModule {}
