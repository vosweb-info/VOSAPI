import { Response } from 'express';

class ErrorHandler extends Error {
  status: number;

  message: string;

  data: any;

  constructor(status: number, message: string, data?: any) {
    super();
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

function handleError(error: ErrorHandler, res: Response) {
  const { status = 500, message, data } = error;
  res.status(status).send({
    message,
    data,
  });
}

export { ErrorHandler, handleError };
