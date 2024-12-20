import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../Auth/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogController.createBlogs,
);

export const BlogRoutes = router;
