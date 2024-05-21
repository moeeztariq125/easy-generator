import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger, loggerEnums } from 'src/utils/logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const originalSend = res.send;
        AppLogger.info(
            `
      ${loggerEnums.ServiceEnter}-${req.originalUrl}-${req.method}`,
            {
                query: req.query,
                body: req.body,
                params: req.params,
            },
        );

        res.send = function (this: Response, body?: any): Response {
            AppLogger.info(
                `
      ${loggerEnums.ServiceExit}-${req.originalUrl}-${req.method}`,
                body,
            );
            return originalSend.call(this, body);
        };
        next();
    }
}
