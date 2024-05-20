import { Express, json } from 'express';
import { authRouter } from '../api/routes';
import { GlobalErrorHandler, requestLogger } from '../middlewares';
import cors from 'cors';

export default (app: Express) => {
  const whitelist = ['http://localhost:5173'];
  const corsOptions = {
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(cors(corsOptions));
  app.use(json());
  app.use(requestLogger);
  app.use('/api/users', authRouter);
  app.use(GlobalErrorHandler);
};
