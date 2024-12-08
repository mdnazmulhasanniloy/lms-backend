import { Router } from 'express';
import { otpRoutes } from '../modules/otp/otp.routes';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { notificationRoutes } from '../modules/notification/notificaiton.route';
import { courseRoute } from '../modules/course/course.route';
import { postRoutes } from '../modules/post/post.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/otp',
    route: otpRoutes,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
  {
    path: '/course',
    route: courseRoute,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
