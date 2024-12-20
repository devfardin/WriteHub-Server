import { Response } from 'express';
import { TRequest } from '../interface/constant.interface';

const sendResponse = <T>(res: Response, data: TRequest<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: data.statusCode,
    data: data.data,
  });
};
export default sendResponse;
