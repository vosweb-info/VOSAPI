import nodemailer from 'nodemailer';
// @ts-ignore
import handlebars from 'nodemailer-express-handlebars';

const {
  MAIL_HOST = 'localhost',
  MAIL_PORT = '1025',
  MAIL_USER = 'project.1',
  MAIL_PASSWORD = 'secret.1',
  NODE_ENV,
} = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: Number(MAIL_PORT),
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
  secure: NODE_ENV === 'production',
});

transporter.use(
  'compile',
  handlebars({
    viewEngine: {
      extName: '.handlebars',
      layoutsDir: 'src/views/email',
      defaultLayout: 'email',
    },
    viewPath: 'src/views/email',
  }),
);

export { transporter as Nodemailer };
