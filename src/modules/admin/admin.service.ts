import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/errors/AppError';
import { UserModel } from '../User/user.model';
import { JwtPayload } from 'jsonwebtoken';
import { BlogModel } from '../Blog/blog.model';

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
  if (currentUser?.email === user?.email) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Users are not allowed to delete their own account.',
    );
  }
  const result = await UserModel.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true, runValidators: true },
  );
  return result;
};

const deleteBlogFromDB = async (blogId: string, currentUser: JwtPayload) => {
  if (currentUser.role !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to perform this action. Admins only.',
    );
  }
  const blog = await BlogModel.findById(blogId);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog are not found');
  }
  const result = await BlogModel.findByIdAndDelete(blogId);
  return result;
};

export const AdminServices = {
  userUpdateIntoBD,
  deleteBlogFromDB,
};
