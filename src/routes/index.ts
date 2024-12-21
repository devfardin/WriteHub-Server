import { Router } from 'express';
import { UserRouters } from '../modules/User/user.route';
import { AuthRouters } from '../modules/Auth/auth.route';
import { BlogRoutes } from '../modules/Blog/blog.route';
import { AdminRoutes } from '../modules/admin/admin.route';

const router = Router();
const moduleRouter = [
  {
    path: '/auth',
    route: UserRouters,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;
