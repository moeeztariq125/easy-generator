import { NextFunction, Request, Response } from 'express';
import { authenticateAccessToken } from '../utils/jwt/authenticateToken';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).json({
        errors: [
          {
            message: 'You are not authenticated',
          },
        ],
      });
    }
    authenticateAccessToken(token, (err, user) => {
      if (err) {
        res.status(403).json({
          errors: [
            {
              message: 'Forbidden Request',
            },
          ],
        });
      }
      req.user = user;
    });
    next();
  } catch (err: any) {
    next(err);
  }
};
