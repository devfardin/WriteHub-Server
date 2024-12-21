import express from 'express';
import auth from '../Auth/auth';
import { USER_ROLE } from '../User/user.constant';
import { AdminController } from './admin.controller';

const router = express.Router();
// admin can blocked any user
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminController.userUpdateIntoBD,
);
// admin can delted any user post
router.delete(
  '/blogs/:id',
  auth(USER_ROLE.admin),
  AdminController.deleteBlogFromDB,
);

export const AdminRoutes = router;
