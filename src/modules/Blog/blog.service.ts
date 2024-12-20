import mongoose from 'mongoose';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: TBlog, id: string) => {
  payload.author = new mongoose.Types.ObjectId(id);
  const result = await BlogModel.create(payload);
  return result;
};
export const BlogServices = {
  createBlogIntoDB,
};
