import cors from 'cors';
import express, {
  Application, NextFunction, Request, Response,
} from 'express';
import fs from 'fs';
import morgan from 'morgan';
import { Nodemailer } from './config/nodemailer.config';
import routes from './routes';
import { ErrorHandler, handleError } from './helpers';

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

app.get('*', () => {
  throw new ErrorHandler(404, 'Not Found');
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
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
