import express from 'express';
import auth from '../Auth/auth';
import { USER_ROLE } from '../User/user.constant';
import { AdminController } from './admin.controller';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminController.userUpdateIntoBD,
);

export const AdminRoutes = router;
