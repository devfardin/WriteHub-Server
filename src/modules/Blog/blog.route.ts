import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../Auth/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();
router.post('/', auth(USER_ROLE.user), BlogController.createBlogs);
router.patch('/:blogId', auth(USER_ROLE.user), BlogController.updateBlogIntoDB);
router.delete(
  '/:blogId',
  auth(USER_ROLE.user),
  BlogController.deleteBlogFromDB,
);

export const BlogRoutes = router;
