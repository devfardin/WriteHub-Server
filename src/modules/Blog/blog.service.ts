/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import AppError from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { UserModel } from '../User/user.model';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { BlogSearchAbleFields } from './blog.constant';

const createBlogIntoDB = async (payload: TBlog, id: string) => {
  payload.author = new mongoose.Types.ObjectId(id);
  const result = await BlogModel.create(payload);
  return result;
};

// User can  update their own blog by its ID.
const updateBlogIntoDB = async (
  payload: TBlog,
  blogId: string,
  userInfo: any,
) => {
  // get the blog by id
  const blog = await BlogModel.findById(blogId);
  if (!blog?.author) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Author information not found for this blog.',
    );
  }
  // get user for validate there own blog
  const author = await UserModel.findById(blog?.author);
  const authorEmail = userInfo.email;
  const blogEmail = author?.email;
  if (authorEmail !== blogEmail) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `You are not authorized to update another author's blog`,
    );
  }
  // blog update function
  const result = await BlogModel.findByIdAndUpdate(blogId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// get all the blog from database
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(BlogModel.find().populate('author'), query)
    .search(BlogSearchAbleFields)
    .filter()
    .sortBy();
  const result = await blogQuery.modelQuery;
  return result;
};

// User can  Delete their own blog by its ID.
const deleteBlogFromDB = async (blogId: string, userInfo: any) => {
  // get the blog by id
  const blog = await BlogModel.findById(blogId);
  if (!blog?.author) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Author information not found for this blog.',
    );
  }
  // get user for validate there own blog
  const author = await UserModel.findById(blog?.author);
  const authorEmail = userInfo.email;
  const blogEmail = author?.email;

  if (authorEmail !== blogEmail) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `You are not authorized to delete another author's blog`,
    );
  }
  // blog update function
  const result = await BlogModel.findByIdAndDelete(blogId);
  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogFromDB,
};
