import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.entity';
import * as moment from 'moment';
import { UserOnline } from '../auth/user-online.entity';
import { UserOnlineService } from '../auth/user-online.service';
const jwtConfig = config.get('jwt');

@Injectable()
export class OnlineMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private userOnlineService: UserOnlineService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    
    const tokenA: any = req.headers.authorization;
    if (tokenA) {
      // 有token则记录在线状态
      
      const token = tokenA.split(' ')[1];
      try {
        const data: any = jwt.verify(
          token,
          process.env.JWT_SECRET || jwtConfig.secret,
        );
        const { sub } = data;
        // 登錄用戶id
        // console.log('Request Middleware ...', sub);
        const user = await this.userService.getUserById(Number(sub));
        if (!user) {
          next();
        }
        let online = await this.userOnlineService.getUserOnlineByUserId(sub);
        if (!online) {
          // 之前未登錄過
          online = new UserOnline();
          online.userId = user.id;
          online.showname = user.showname;
          online.onlineDate = new Date();
          online.todayRequestNumber = 0;
        } else {
          // 之前登陸過
          const onlineDate = online.onlineDate;
          const today = moment().startOf('day');
          // 判斷今日是否有有時間記錄
          if (!moment(onlineDate).isSame(today, 'd')) {
            // 今日第一次請求
            online.onlineDate = new Date();
            online.todayRequestNumber = 0;
          } 
        }
        // 請求次數加一
        online.todayRequestNumber++;
        await this.userOnlineService.saveOrUpdate(online);
      } catch (tokenExpiredError) {
        console.error(tokenExpiredError);
      }
    }
    next();
  }
}
