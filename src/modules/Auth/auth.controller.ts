import catchAsync from '../../app/utils/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../app/utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Login successful',
    data: {
      token: result.accessToken,
    },
  });
});
export const AuthController = {
  loginUser,
};
