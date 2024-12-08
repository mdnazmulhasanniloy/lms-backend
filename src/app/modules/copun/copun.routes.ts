
import { Router } from 'express';
import { copunController } from './copun.controller';

const router = Router();

router.post('/', copunController.createCopun);
router.patch('/:id', copunController.updateCopun);
router.delete('/:id', copunController.deleteCopun);
router.get('/:id', copunController.getCopunById);
router.get('/', copunController.getAllCopun);

export const copunRoutes = router;