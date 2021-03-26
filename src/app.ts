import cors from 'cors';
import express, {
  Application, NextFunction, Request, Response,
} from 'express';
import fs from 'fs';
import morgan from 'morgan';
import { Nodemailer } from './config/nodemailer.config';
import routes from './routes';

const { PORT = 3000, NODE_ENV } = process.env;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/v1', routes);

if (NODE_ENV === 'production') {
  app.use(
    morgan('tiny', {
      stream: fs.createWriteStream('./app.log', { flags: 'a' }),
    }),
  );
}

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    message: 'Not Found',
  });
  next();
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const code: number = error.status || error.statusCode || 500;
  const { message } = error;

  res.status(code).send({ message });
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
