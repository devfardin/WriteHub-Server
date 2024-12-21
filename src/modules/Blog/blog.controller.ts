import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { BlogServices } from './blog.service';
import { UserModel } from '../User/user.model';
import AppError from '../../app/errors/AppError';

// Create New Blog in the database
const createBlogs = catchAsync(async (req, res) => {
  const authorInfo = await UserModel.findById(req.user.id);

  // check the user are active
  if (authorInfo?.isBlocked) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Your account is blocked. You cannot create new posts.',
    );
  }
  const result = await BlogServices.createBlogIntoDB(req.body, req.user.id);
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.CREATED,
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: {
        _id: authorInfo?._id,
        name: authorInfo?.name,
        email: authorInfo?.email,
      },
    },
  });
});

// Update blog into dataabase
const updateBlogIntoDB = catchAsync(async (req, res) => {
  const authorInfo = await UserModel.findById(req.user.id);
  const { blogId } = req.params;
  const result = await BlogServices.updateBlogIntoDB(
    req.body,
    blogId,
    req.user,
  );
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: {
        _id: authorInfo?._id,
        name: authorInfo?.name,
        email: authorInfo?.email,
      },
    },
  });
});

// get all the blog from database
const getAllBlogFromDB = catchAsync(async (req, res) => {
  // const authorInfo = await UserModel.findById(req.user.id);

  const result = await BlogServices.getAllBlogFromDB();
  sendResponse(res, {
    success: true,
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result.map((blog) => ({
      _id: blog?._id,
      title: blog?.title,
      content: blog?.content,
      author: {
        _id: blog?.author?._id,
        name: blog?.author?.name,
        email: blog?.author?.email,
      },
    })),
  });
});

// Delete blog from dataabase
const deleteBlogFromDB = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  await BlogServices.deleteBlogFromDB(blogId, req.user);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const BlogController = {
  createBlogs,
  updateBlogIntoDB,
  deleteBlogFromDB,
  getAllBlogFromDB,
};
