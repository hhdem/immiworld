import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');
    constructor(
      ) {}

    use(request: Request, response: Response, next: NextFunction): void {
      const { ip, method, path: url } = request;
      const userAgent = request.get('user-agent') || '';
      const referer = request.get("referer"); 
  
      response.on('close', async () => {
        const { statusCode } = response;
        const contentLength = response.get('content-length');
        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} from ${referer}}`
        );
      });
  
      next();
    }
}
