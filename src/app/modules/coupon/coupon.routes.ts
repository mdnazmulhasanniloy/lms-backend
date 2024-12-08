
import { Router } from 'express';
import { couponController } from './coupon.controller';

const router = Router();

router.post('/', couponController.createCoupon);
router.patch('/:id', couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);
router.get('/:id', couponController.getCouponById);
router.get('/', couponController.getAllCoupon);

export const couponRoutes = router;