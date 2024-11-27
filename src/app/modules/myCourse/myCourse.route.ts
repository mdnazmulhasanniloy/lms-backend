import { Router } from 'express';
import { myVideosController } from './myCourse.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';

const router = Router();

router.post('/', auth(USER_ROLE.user), myVideosController.createMyVideos);

router.patch('/:id', auth(USER_ROLE.user), myVideosController.updateMyVideos);

router.delete('/:id', auth(USER_ROLE.user), myVideosController.deleteMyVideos);

router.get('/:id', auth(USER_ROLE.user), myVideosController.getMyVideosById);
router.get('/', auth(USER_ROLE.user), myVideosController.getAllMyVideos);

export const myVideosRoutes = router;
