import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { BlogServices } from './blog.service';

const createBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body, req.user.id);
  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: StatusCodes.OK,
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});
export const BlogController = {
  createBlogs,
};
