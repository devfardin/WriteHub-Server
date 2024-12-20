import { NextFunction, Request, RequestHandler, Response } from 'express';

// Created Catch Async function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};
export default catchAsync;
