import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(1),
  content: z.string().min(1),
  techStack: z.union([z.string(), z.array(z.string())]).transform((v) =>
    Array.isArray(v) ? v : v.split(',').map((s) => s.trim()).filter(Boolean)
  ),
  liveUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  order: z.coerce.number().int().default(0),
});

export const updateProjectSchema = createProjectSchema.partial();
