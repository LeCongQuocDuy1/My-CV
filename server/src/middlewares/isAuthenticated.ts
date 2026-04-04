import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

export interface AuthRequest extends Request {
  accountId?: number;
}

export function isAuthenticated(req: AuthRequest, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError(401, 'Unauthorized'));
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
    req.accountId = payload.id;
    next();
  } catch {
    next(new AppError(401, 'Invalid or expired token'));
  }
}
