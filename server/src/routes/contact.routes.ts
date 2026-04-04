import { Router } from 'express';
import { sendContact } from '../controllers/contact.controller';

const router = Router();

router.post('/', sendContact);

export default router;
