import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';
import { AdminServices } from './admin.service';

// Update user to block by admin
const userUpdateIntoBD = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const currentUser = req.user;
  await AdminServices.userUpdateIntoBD(userId, currentUser);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});

// Delte any blog by admin user
const deleteBlogFromDB = catchAsync(async (req, res) => {
  const currentUser = req?.user;
  const { id } = req.params;
  await AdminServices.deleteBlogFromDB(id, currentUser);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});
export const AdminController = {
  userUpdateIntoBD,
  deleteBlogFromDB,
};
