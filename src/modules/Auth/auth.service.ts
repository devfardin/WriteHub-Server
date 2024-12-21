import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { UserModel } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';

import config from '../../app/config';
const loginUser = async (payload: TLoginUser) => {
  const isUser = await UserModel.isUserExistsByCustomEmail(payload.email);

  // checking for finding user
  if (!isUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
  }
  // Checking for Active user
  if (isUser.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User Is Blocked');
  }
  console.log(isUser);

  // checking is the password is correct
  if (!(await UserModel.isPasswordMatch(payload.password, isUser?.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  // Create Token and send user
  const jwtToken = {
    id: isUser?._id,
    email: isUser?.email,
    role: isUser?.role,
  };
  const accessToken = jwt.sign(jwtToken, config.jwt_access_token as string, {
    expiresIn: '364d',
  });
  return {
    accessToken,
  };
};

// Export ALL the Service in auth
export const AuthService = {
  loginUser,
};
