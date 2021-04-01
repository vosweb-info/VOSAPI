import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../helpers';

const { GOOGLE_SECRET } = process.env;

const verify = (req: Request, res: Response, next: NextFunction) => {
  const { verification } = req.body;
  const url: string = `https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_SECRET}&response=${verification}`;

  axios
    .post(url)
    .then(({ data }) => {
      if (data.success) return next();
      throw new ErrorHandler(422, 'reCaptcha verification failed', data['error-codes']);
    })
    .catch((error: any) => {
      next(error);
    });
};

export { verify as ReCaptcha };
