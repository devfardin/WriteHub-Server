/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import AppError from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../User/user.model';

const createBlogIntoDB = async (payload: TBlog, id: string) => {
  payload.author = new mongoose.Types.ObjectId(id);
  const result = await BlogModel.create(payload);
  return result;
};
const updateBlogIntoDB = async (
  payload: TBlog,
  blogId: string,
  userInfo: any,
) => {
  const blog = await BlogModel.findById(blogId);
  if (!blog?.author) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Author information not found for this blog.',
    );
  }
  const author = await UserModel.findById(blog?.author);
  const authorEmail = userInfo.email;
  const blogEmail = author?.email;
  if (authorEmail !== blogEmail) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `You are not authorized to update another author's post`,
    );
  }
  const result = await BlogModel.findByIdAndUpdate(blogId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
};
