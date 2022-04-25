import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserOnline } from "./user-online.entity";
import { UserOnlineRepository } from "./user-online.repository";

@Injectable()
export class UserOnlineService {

    constructor(
        @InjectRepository(UserOnlineRepository)
        private userOnlineRepository: UserOnlineRepository,
    ) {}

    async getUserOnlineByUserId(userId: number): Promise<UserOnline> {
        const found = await this.userOnlineRepository.getOnlineByUserId(userId);
        // found.profile.avatar.path = webConfig.staticPath+found.profile.avatar.path;
        return found;
    }

    async saveOrUpdate(userOnline: UserOnline): Promise<UserOnline> {
        return await this.userOnlineRepository.save(userOnline);
    }

    async getOnlineNumber() {
        const numb = await this.userOnlineRepository.getOnlineNumber();
        return numb;
    }
}