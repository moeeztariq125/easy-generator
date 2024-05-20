import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export default async function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
}
