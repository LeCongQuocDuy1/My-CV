import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { uploadToCloudinary, deleteFromCloudinary } from '../lib/cloudinary';
import { loginSchema } from '../schemas/auth.schema';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/isAuthenticated';

const DEFAULT_AVATAR = 'https://placehold.co/100x100?text=Admin';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const account = await prisma.account.findUnique({ where: { email } });
    if (!account) return next(new AppError(401, 'Invalid credentials'));

    const valid = await bcrypt.compare(password, account.password);
    if (!valid) return next(new AppError(401, 'Invalid credentials'));

    const token = jwt.sign(
      { id: account.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      account: { id: account.id, email: account.email, avatar: account.avatar },
    });
  } catch (err) {
    next(err);
  }
}

// Admin: PUT /api/auth/avatar
export async function updateAvatar(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const existing = await prisma.account.findUnique({ where: { id: req.accountId } });
    if (!existing) return next(new AppError(404, 'Account not found'));

    let avatar = existing.avatar;

    if (req.file) {
      // Delete old avatar from Cloudinary if not default
      if (existing.avatar && !existing.avatar.includes('default-avatar')) {
        await deleteFromCloudinary(existing.avatar);
      }
      avatar = await uploadToCloudinary(req.file.buffer, 'my-cv/avatars');
    }

    const updated = await prisma.account.update({
      where: { id: req.accountId },
      data: { avatar },
      select: { id: true, email: true, avatar: true },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
}
