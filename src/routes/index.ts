import { Router } from 'express';
import { UserRouters } from '../modules/User/user.route';
import { AuthRouters } from '../modules/Auth/auth.route';

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
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;
