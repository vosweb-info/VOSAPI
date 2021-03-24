import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import { Nodemailer } from './config/nodemailer.config';
import { Mail } from './routes';

const { PORT = 3000, NODE_ENV } = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/v1', Mail);

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '.')));

  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, '.', 'index.html'));
    next();
  });
}

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const code = error.status || error.statusCode || 500;
  res.status(code).send({
    message: error.message,
  });
  next();
});

Nodemailer.verify()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

export default app;
