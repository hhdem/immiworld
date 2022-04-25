import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user.service';

const jwtConfig = config.get('jwt');

/**
 * 如果没登录不返回权限错误，而是继续执行，如果已经登录则返回登录信息
 */
@Injectable()
export class AnyAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const ctx = GqlExecutionContext.create(context);
    // const { req } = ctx.getContext();
    const req =
      context.switchToHttp().getRequest();

    const tokenA: string = req.headers.authorization;
    if (!tokenA) {
      // 没有token则直接返回
      return true;
    }
    const token = tokenA.split(' ')[1];
    try {
      const data: any = jwt.verify(
        token,
        process.env.JWT_SECRET || jwtConfig.secret,
      );
      const { sub } = data;
      const user = await this.userService.getUserById(sub);
      if (!!user) {
        req.user = user;
      }
    } catch (tokenExpiredError) {
      throw new HttpException('Token Expired', HttpStatus.UNAUTHORIZED);
      // throw new TokenExpiredError('Token Expired', new Date());
    }

    return true;
  }
}
