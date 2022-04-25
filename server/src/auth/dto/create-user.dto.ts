import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import * as _ from 'lodash'
import { User } from '../user.entity';
import { UserGender, UserShowStatusSetting } from '../user.enum';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { Match } from '../decorator/match.decorator';

export class CreateUserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  showname: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20, { message: '太长了' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  @Match('passwordConfirm', {message: '密码不匹配'})
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', {message: '密码不匹配'})
  passwordConfirm: string;

  @IsOptional()
  oldPassword: string;
  
  @IsOptional()
  @IsEnum(UserGender, {
    message: '无效的用户性別',
  })
  gender: UserGender;

  @IsOptional()
  @IsEnum(UserShowStatusSetting, {
    message: '无效的顯示状态设置',
  })
  onlineStatus: UserShowStatusSetting;

  @IsOptional()
  @IsEnum(UserShowStatusSetting, {
    message: '顯示加入的小組',
  })
  showJoinTeam: UserShowStatusSetting;

  @IsOptional()
  @IsEnum(UserShowStatusSetting, {
    message: '顯示發佈的主題',
  })
  showPublishTopic: UserShowStatusSetting;

  @IsOptional()
  @IsEnum(UserShowStatusSetting, {
    message: '顯示提交的CCP',
  })
  showCreatedCCP: UserShowStatusSetting;

  @IsOptional()
  @IsEnum(UserShowStatusSetting, {
    message: '顯示收藏',
  })
  showFavourite: UserShowStatusSetting;

  @IsOptional()
  @IsEnum(UserShowStatusSetting, {
    message: '顯示關注用戶',
  })
  showLikedUser: UserShowStatusSetting;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  mobile: string;

  // 將屬性複製到User對應屬性中
  public static async copyDtoToUser(userDto: CreateUserDto, user: User): Promise<User> {
    if (!_.isEmpty(userDto.showname)) {
      user.showname = userDto.showname;
    }
    if (!_.isEmpty(userDto.username)) {
      user.username = userDto.username;
    }
    if (!_.isEmpty(userDto.oldPassword) && !_.isEmpty(userDto.password)) {
      const oldPassHash = await bcrypt.hash(userDto.oldPassword, user.salt);
      if (_.isEqual(oldPassHash, user.password)) {
        // 老密码相等，则修改新密码
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(userDto.password, user.salt);
      }
    }
    
    if (userDto.gender) {
      user.profile.gender = userDto.gender;
    }
    if (userDto.email) {
      user.profile.email = userDto.email;
    }
    if (userDto.mobile) {
      user.profile.mobile = userDto.mobile;
    }
    if (userDto.onlineStatus) {
      user.profile.onlineStatus = userDto.onlineStatus;
    }
    if (userDto.showCreatedCCP) {
      user.profile.showCreatedCCP = userDto.showCreatedCCP;
    }
    if (userDto.showFavourite) {
      user.profile.showFavourite = userDto.showFavourite;
    }
    if (userDto.showJoinTeam) {
      user.profile.showJoinTeam = userDto.showJoinTeam;
    }
    if (userDto.showLikedUser) {
      user.profile.showLikedUser = userDto.showLikedUser;
    }
    if (userDto.showPublishTopic) {
      user.profile.showPublishTopic = userDto.showPublishTopic;
    }
    return user;
  }
}
