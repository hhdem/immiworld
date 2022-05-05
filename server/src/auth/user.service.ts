import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { EmailStatus, UserRole } from './auth.enum';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { MailerService } from '@nestjs-modules/mailer';

import * as _ from 'lodash';
import * as config from 'config';
const webConfig = config.get('web');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private profileRepository: ProfileRepository,
    private readonly mailerService: MailerService
  ) {}

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne({
      where: { id },
    });
    if (!found) {
      throw new NotFoundException(`User id ${id} not found`);
    }
    // found.profile.avatar.path = webConfig.staticPath+found.profile.avatar.path;
    return found;
  }

  async getUserByUsername(username: string): Promise<User> {
    const found = await this.userRepository.findOne({
      where: { username },
    });
    if (!found) {
      throw new NotFoundException(`User username ${username} not found`);
    }
    return found;
  }

  async validatePassword(
    authCredentialsDto: AuthCredentialsDto,
    userRole?: UserRole,
  ): Promise<{ username: string; role: string }> {
    return await this.userRepository.validatePasswordWithRole(
      authCredentialsDto,
      userRole,
    );
  }

  async getUsers(userFilterDto: GetUsersFilterDto): Promise<User[]> {
    return await this.userRepository.find();
  }

  async saveUserSetting(userDto: CreateUserDto) {
    // 根據id判斷是否已存在，不存在則報錯，已存在則更新
    if(!userDto.id) {
      throw new NotFoundException(`Id is needed for saveUserSetting() method.`);
    }
    let found = await this.getUserById(userDto.id);
    if (!found) {
      throw new NotFoundException(`User not Found in saveUserSetting method `);
    } else if (!found.profile) {
      let newProfile = new Profile();
      newProfile.gender = userDto.gender;
      newProfile.email = userDto.email;
      newProfile.mobile = userDto.mobile;
      newProfile.onlineStatus = userDto.onlineStatus;
      newProfile.showCreatedCCP = userDto.showCreatedCCP;
      newProfile.showFavourite = userDto.showFavourite;
      newProfile.showJoinTeam = userDto.showJoinTeam;
      newProfile.showLikedUser = userDto.showLikedUser;
      newProfile.showPublishTopic = userDto.showPublishTopic;
      newProfile = await this.profileRepository.saveProfile(newProfile);
      found.profile = newProfile;
      found = await CreateUserDto.copyDtoToUser(userDto, found);
      found.save();
    } else {
      found = await CreateUserDto.copyDtoToUser(userDto, found);
      this.profileRepository.save(found.profile);
      this.userRepository.save(found);
    }
    return found;
  }

  async getStatistic(id) {
    let found = await this.getUserById(id);
    return found;
  }

  async changeEmailStatus(id, status: EmailStatus) {
    let found = await this.getUserById(id);
    found.emailStatus = status;
    this.userRepository.save(found);
  }
}
