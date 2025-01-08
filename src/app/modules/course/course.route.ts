import { Router } from 'express';
import { videosController } from './course.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants'; 
import parseData from '../../middleware/parseData';
import validateRequest from '../../middleware/validateRequest';
import { videosValidator } from './course.validation';
import fileUpload from '../../middleware/fileUploader';
const upload = fileUpload('./public/uploads/banner');

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  upload.single('banner'),
  parseData(),
  // validateRequest(videosValidator.createVideosZodSchema),
  videosController.createCourse,
);

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  upload.single('banner'),
  parseData(),
  videosController.updateCourse,
);
 
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  upload.single('banner'),
  parseData(),
  videosController.deleteCourse,
);

router.get('/:id', videosController.getCourseById);
router.get('/', videosController.getAllCourse);

export const courseRoute = router;
