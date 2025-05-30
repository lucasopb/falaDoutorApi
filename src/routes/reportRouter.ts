import { Router } from 'express';
import { reportController } from '../controllers/reportController';

const router = Router();

router.post('/', reportController);

export default router;
