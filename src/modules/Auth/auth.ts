import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { TUserRole } from '../User/user.interface';
import AppError from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../app/config';
const auth = (...requireRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // check for authorize user
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized user!',
      );
    }
    // check to valid token
    jwt.verify(
      token,
      config.jwt_access_token as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'Invalid token. Access denied.',
          );
        }
        // check for user have valid  role for this token
        const role = (decoded as JwtPayload).role;

        if (requireRole && !requireRole.includes(role)) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'User role does not match the token role. Access denied.',
          );
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};
export default auth;
