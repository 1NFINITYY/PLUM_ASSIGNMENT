import { Router } from 'express';
import {
  classifyNeedController,
  generatePlanController,
} from '../controllers/aiController.js';

const router = Router();

// POST /api/classify
router.post('/classify', classifyNeedController);

// POST /api/plan
router.post('/plan', generatePlanController);

export default router;
