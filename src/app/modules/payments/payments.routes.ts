import { Router } from 'express';
import { paymentsController } from './payments.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post('/webhook', paymentsController.webhook);
router.post('/', auth(USER_ROLE.user), paymentsController.initPayment);
router.patch('/:id', paymentsController.updatePayments);
router.delete('/:id', paymentsController.deletePayments);
router.get('/:id', paymentsController.getPaymentsById);
router.get('/', paymentsController.getAllPayments);

export const paymentsRoutes = router;
