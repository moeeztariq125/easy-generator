import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { AppLogger, loggerEnums } from '../utils/logger';

const GlobalErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) next();
  AppLogger.error(`${loggerEnums.ServiceError}-${req.originalUrl}-${req.method}`, err);
  return res.status(400).json({
    errors: [
      {
        message: err.message || 'Internal Server Error',
      },
    ],
  });
};

export default GlobalErrorHandler;
