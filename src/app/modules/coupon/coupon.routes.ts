import { Router } from 'express';
import { couponController } from './coupon.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post('/', auth(USER_ROLE?.admin), couponController.createCoupon);
router.patch('/:id', auth(USER_ROLE?.admin), couponController.updateCoupon);
router.delete('/:id', auth(USER_ROLE?.admin), couponController.deleteCoupon);
router.get('/:id', auth(USER_ROLE?.admin), couponController.getCouponById);
router.get('/', auth(USER_ROLE?.admin), couponController.getAllCoupon);

export const couponRoutes = router;
