import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TokenExpiredError } from "jsonwebtoken";

@Injectable()
export class RefreshAuthGuard extends AuthGuard('jwt') {

  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      // do stuff when token is expired
      return new TokenExpiredError('Token need refresh', new Date());
    }
    return user;
  }

}