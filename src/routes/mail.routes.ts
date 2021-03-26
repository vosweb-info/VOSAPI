import {
  NextFunction, Request, Response, Router,
} from 'express';
import { Nodemailer } from '../config/nodemailer.config';
import { ReCaptcha } from '../middlewares';

const { MAIL_ADDRESS = 'local@test.com' } = process.env;
const router = Router();

router
  .route('/')
  .post(ReCaptcha, (req: Request, res: Response, next: NextFunction) => {
    const {
      name, email, phone, subject, message,
    } = req.body;
    const contactData = {
      from: email,
      to: MAIL_ADDRESS,
      subject: `VOSWEB: ${subject}`,
      template: 'email',
      context: {
        name, email, phone, subject, message,
      },
    };

    Nodemailer.sendMail(contactData)
      .then((response: any) => {
        const { messageId } = response;
        res.status(200).send({
          message: 'Email successfully sent to recipient!',
          messageId,
        });
        next();
      })
      .catch((error) => next(error));
  });

export default router;
