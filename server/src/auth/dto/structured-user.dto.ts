import { User } from '../user.entity';
import { UserRole } from '../auth.enum';
import { Photo } from '../../file/photo.entity';
import { UserGender, UserShowStatusSetting } from '../user.enum';
/**
 * 返回结构化的User对象
 */
export class StructuredUserDto {
  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.role = user.role;
    this.createDate = user.createDate;
    this.showname = user.showname;
    if(user.profile) {
      this.gender = user.profile.gender;
      this.avatar = user.profile.avatar;
      this.onlineStatus = user.profile.onlineStatus;
      this.showJoinTeam = user.profile.showJoinTeam;
      this.showPublishTopic = user.profile.showPublishTopic;
      this.showCreatedCCP = user.profile.showCreatedCCP;
      this.showFavourite = user.profile.showFavourite;
      this.showLikedUser = user.profile.showLikedUser;
      this.email = user.profile.email;
      this.mobile = user.profile.mobile;
    }
    this.collected = new Array()[0];
    this.joinedTeams = new Array()[0];
    this.ownedTeams = new Array()[0];
    this.ownedTopic = new Array()[0];
    this.ownedCCP = new Array()[0];
    this.collectedTopic = new Array()[0];
  }
  id: number;
  username: string;
  showname: string;
  role: UserRole;
  createDate: Date;
  gender: UserGender;
  avatar: Photo;
  email: string;
  mobile: string;
  collected: [];
  joinedTeams: [];
  ownedTeams: [];
  ownedTopic: [];
  ownedCCP: [];
  collectedTopic: [];
  onlineStatus: UserShowStatusSetting;
  showJoinTeam: UserShowStatusSetting;
  showPublishTopic: UserShowStatusSetting;
  showCreatedCCP: UserShowStatusSetting;
  showFavourite: UserShowStatusSetting;
  showLikedUser: UserShowStatusSetting;
}

export enum CollectType {
  TEAM = 'team',
  NEWS = 'news',
}