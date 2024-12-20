import { Router } from 'express';
import { UserRouters } from '../modules/User/user.route';

const router = Router();
const moduleRouter = [
  {
    path: '/auth',
    route: UserRouters,
  },
];
moduleRouter.forEach((route) => router.use(route.path, route.route));
export default router;
