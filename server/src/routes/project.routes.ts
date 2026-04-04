import { Router } from 'express';
import { upload } from '../lib/upload';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import {
  listProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller';

const router = Router();

// Public
router.get('/', listProjects);
router.get('/:slug', getProject);

// Admin (protected)
router.post('/', isAuthenticated, upload.single('thumbnail'), createProject);
router.put('/:id', isAuthenticated, upload.single('thumbnail'), updateProject);
router.delete('/:id', isAuthenticated, deleteProject);

export default router;
