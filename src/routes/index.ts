import { Router } from 'express';
import MailRoutes from './mail.routes';

const router: Router = Router();

router.use('/mail', MailRoutes);

export default router;
