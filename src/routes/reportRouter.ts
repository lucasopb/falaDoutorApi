import { Router } from 'express';
import { reportController } from '../controllers/reportController';
import { paginate } from "../middlewares/pagination";

const router = Router();

router.post('/', paginate, reportController);

export default router;
