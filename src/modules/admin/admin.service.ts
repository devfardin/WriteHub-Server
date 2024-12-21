import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { UserModel } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';

const userUpdateIntoBD = async (userId: string, currentUser: JwtPayload) => {
  if (currentUser.role !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to perform this action. Admins only.',
    );
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const result = await UserModel.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true, runValidators: true },
  );
  return result;
};
export const AdminServices = {
  userUpdateIntoBD,
};
