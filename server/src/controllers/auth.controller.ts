import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { loginSchema } from '../schemas/auth.schema';
import { AppError } from '../middlewares/errorHandler';
import { AuthRequest } from '../middlewares/isAuthenticated';

const DEFAULT_AVATAR = '/public/defaults/default-avatar.svg';

function deleteUploadedFile(filePath: string) {
  if (filePath.startsWith('/uploads/')) {
    const full = path.join(process.cwd(), 'uploads', path.basename(filePath));
    if (fs.existsSync(full)) fs.unlinkSync(full);
  }
}

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

    const avatar = req.file ? `/uploads/${req.file.filename}` : DEFAULT_AVATAR;

    // Xóa ảnh cũ nếu không phải default
    if (req.file && existing.avatar !== DEFAULT_AVATAR) {
      deleteUploadedFile(existing.avatar);
    }

    const updated = await prisma.account.update({
      where: { id: req.accountId },
      data: { avatar },
      select: { id: true, email: true, avatar: true },
    });

    res.json(updated);
  } catch (err) {
    if (req.file) deleteUploadedFile(`/uploads/${req.file.filename}`);
    next(err);
  }
}
