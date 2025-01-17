import { Router } from 'express';
import { otpRoutes } from '../modules/otp/otp.routes';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { notificationRoutes } from '../modules/notification/notificaiton.route';
import { courseRoute } from '../modules/course/course.route';
import { postRoutes } from '../modules/post/post.routes';
import { couponRoutes } from '../modules/coupon/coupon.routes';
import { enrollmentsRoutes } from '../modules/enrollments/enrollments.routes';
import { blogsRoutes } from '../modules/blogs/blogs.routes';
import { videosRoutes } from '../modules/videos/videos.routes';
import { paymentsRoutes } from '../modules/payments/payments.routes';

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
    path: '/videos',
    route: videosRoutes,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
  {
    path: '/coupons',
    route: couponRoutes,
  },
  {
    path: '/enrollments',
    route: enrollmentsRoutes,
  },
  {
    path: '/blogs',
    route: blogsRoutes,
  },
  {
    path: '/payments',
    route: paymentsRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
