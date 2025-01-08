import { Router } from 'express';
import { enrollmentsController } from './enrollments.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post('/', auth(USER_ROLE.user), enrollmentsController.createEnrollments);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  enrollmentsController.updateEnrollments,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  enrollmentsController.deleteEnrollments,
);
router.get(
  '/my-enrollments',
  auth(USER_ROLE.admin, USER_ROLE.user),
  enrollmentsController.getMyEnrollments,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  enrollmentsController.getEnrollmentsById,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  enrollmentsController.getAllEnrollments,
);

export const enrollmentsRoutes = router;
