import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import prisma from '../lib/prisma';
import { createProjectSchema, updateProjectSchema } from '../schemas/project.schema';
import { AppError } from '../middlewares/errorHandler';

function deleteFile(filePath: string) {
  const full = path.join(process.cwd(), 'uploads', path.basename(filePath));
  if (fs.existsSync(full)) fs.unlinkSync(full);
}

// Public: GET /api/projects
export async function listProjects(_req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true, title: true, slug: true, description: true,
        thumbnail: true, techStack: true, liveUrl: true, repoUrl: true, order: true,
      },
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

// Public: GET /api/projects/:slug
export async function getProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await prisma.project.findUnique({ where: { slug: String(req.params.slug) } });
    if (!project) return next(new AppError(404, 'Project not found'));
    res.json(project);
  } catch (err) {
    next(err);
  }
}

const DEFAULT_THUMBNAIL = '/public/defaults/default-thumbnail.svg';

// Admin: POST /api/projects
export async function createProject(req: Request, res: Response, next: NextFunction) {
  try {
    const data = createProjectSchema.parse(req.body);
    const thumbnail = req.file ? `/uploads/${req.file.filename}` : DEFAULT_THUMBNAIL;

    const project = await prisma.project.create({
      data: { ...data, thumbnail },
    });
    res.status(201).json(project);
  } catch (err) {
    if (req.file) deleteFile(req.file.filename);
    next(err);
  }
}

// Admin: PUT /api/projects/:id
export async function updateProject(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return next(new AppError(404, 'Project not found'));

    const data = updateProjectSchema.parse(req.body);
    let thumbnail = existing.thumbnail;

    if (req.file) {
      deleteFile(existing.thumbnail);
      thumbnail = `/uploads/${req.file.filename}`;
    }

    const project = await prisma.project.update({
      where: { id },
      data: { ...data, thumbnail },
    });
    res.json(project);
  } catch (err) {
    if (req.file) deleteFile(req.file.filename);
    next(err);
  }
}

// Admin: DELETE /api/projects/:id
export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return next(new AppError(404, 'Project not found'));

    deleteFile(existing.thumbnail);
    await prisma.project.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
