import { Router } from 'express';
import { blogsController } from './blogs.controller';
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
  upload.single('image'),
  parseData(),
  blogsController.createBlogs,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  upload.single('image'),
  parseData(),
  blogsController.updateBlogs,
);
router.delete('/:id', auth(USER_ROLE.admin), blogsController.deleteBlogs);
router.get('/:id', blogsController.getBlogsById);
router.get('/', blogsController.getAllBlogs);

export const blogsRoutes = router;
