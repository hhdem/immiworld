import { EntityRepository, Repository } from "typeorm";
import { Profile } from "./profile.entity";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {

    async saveProfile(profile: Profile): Promise<Profile> {
        const pro = new Profile();
        pro.gender = profile.gender;
        pro.user = profile.user;
        pro.avatar = profile.avatar;
        pro.email = profile.email;
        pro.mobile = profile.mobile;
        pro.onlineStatus = profile.onlineStatus;
        pro.showCreatedCCP = profile.showCreatedCCP;
        pro.showFavourite = profile.showFavourite;
        pro.showJoinTeam = profile.showJoinTeam;
        pro.showLikedUser = profile.showLikedUser;
        pro.showPublishTopic = profile.showPublishTopic;
        await pro.save();
        // delete news.user;
        return pro;
      }
}