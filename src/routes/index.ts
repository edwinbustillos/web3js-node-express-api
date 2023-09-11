import { Router } from 'express';
import wallet from './wallet';
import block from './block';
import event from './event';

const router = Router();

router.use('/wallet', wallet);
router.use('/block', block);
router.use('/events', event);

export default router;
