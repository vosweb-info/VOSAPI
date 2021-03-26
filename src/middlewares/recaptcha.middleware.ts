import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

const { GOOGLE_SECRET } = process.env;

const verify = (req: Request, res: Response, next: NextFunction) => {
  const { verification } = req.body;
  const url: string = `https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_SECRET}&response=${verification}`;

  axios
    .post(url)
    .then(({ data }) => {
      if (data.success) return next();
      return next({
        message: data['error-codes'].join(', '),
      });
    })
    .catch((error: any) => {
      next(error);
    });
};

export { verify as ReCaptcha };
