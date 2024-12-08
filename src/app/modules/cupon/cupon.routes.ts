
import { Router } from 'express';
import { cuponController } from './cupon.controller';

const router = Router();

router.post('/', cuponController.createCupon);
router.patch('/:id', cuponController.updateCupon);
router.delete('/:id', cuponController.deleteCupon);
router.get('/:id', cuponController.getCuponById);
router.get('/', cuponController.getAllCupon);

export const cuponRoutes = router;