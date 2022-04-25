import { EntityRepository, Repository } from "typeorm";
import { UserOnline } from "./user-online.entity";
import * as moment from 'moment';

@EntityRepository(UserOnline)
export class UserOnlineRepository extends Repository<UserOnline> {
  async getOnlineByUserId(userId: number) {
    if (userId) {
      const query = this.createQueryBuilder('userOnline');
      query.where('userOnline.userId = :userId', { userId});
      const online = await query.getOne();
      return online;
    }
    return null;
  }

  async getOnlineNumber() {
    const today = moment().startOf('day').valueOf()
    const query = this.createQueryBuilder('userOnline');
    query.where('to_days(userOnline.onlineDate) = to_days(now())');
    const online = await query.getCount();
    return online;
  }
}
