import { Router } from 'express';
import { videosController } from './videos.controller';
import multer, { memoryStorage } from 'multer';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import parseData from '../../middleware/parseData';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });

router.post(
  '/',
  auth(USER_ROLE.admin),
  upload.single('video'),
  parseData(),
  videosController.createVideos,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  upload.single('video'),
  parseData(),
  videosController.updateVideos,
);
router.delete('/:id', auth(USER_ROLE.admin), videosController.deleteVideos);
router.get(
  '/course/:courseId',
  auth(USER_ROLE.admin, USER_ROLE.user),
  videosController.getVideosByCourseIdId,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  videosController.getVideosById,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  videosController.getAllVideos,
);

export const videosRoutes = router;
