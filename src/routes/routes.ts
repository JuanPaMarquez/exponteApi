import { Router } from 'express';
import { helloWorldController } from '../controllers/helloController';

const router = Router();

router.get('/hello', helloWorldController);

export default router;
