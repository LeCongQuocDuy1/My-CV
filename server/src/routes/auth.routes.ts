import { Router } from 'express';
import { login, updateAvatar } from '../controllers/auth.controller';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { upload } from '../lib/upload';

const router = Router();

router.post('/login', login);
router.put('/avatar', isAuthenticated, upload.single('avatar'), updateAvatar);

export default router;
