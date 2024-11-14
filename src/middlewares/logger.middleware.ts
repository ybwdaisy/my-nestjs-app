import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { originalUrl, params, query } = req;
  console.log('Request...', {
    originalUrl,
    params,
    query,
  });
  next();
};
