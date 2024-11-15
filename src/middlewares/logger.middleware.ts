import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method, body } = req;
    new Logger('LoggerMiddleware').log(
      `${originalUrl}, ${method}, ${JSON.stringify(body)}`,
    );
    next();
  }
}
