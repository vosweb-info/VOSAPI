import express, { Request, Response } from 'express';
import morgan from 'morgan';
import project from '../package.json';

const { PORT = 3000 } = process.env;
const { name, version } = project;
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req: Request, res: Response) => {
  res.send(`Welcome to ${name} | v${version}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
