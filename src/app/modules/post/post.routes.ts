import { Router } from 'express';
import { postController } from './post.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import parseData from '../../middleware/parseData';
import multer, { memoryStorage } from 'multer';

const router = Router();
const storage = memoryStorage();
const upload = multer({ storage });
router.post(
  '/',
  auth(USER_ROLE.user),
  upload.single('image'),
  parseData(),
  postController.createPost,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  upload.single('image'),
  parseData(),
  postController.updatePost,
);
router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  postController.deletePost,
);
router.get('/my-posts', auth(USER_ROLE.user), postController.getMyPosts);
router.get('/:id', postController.getPostById);
router.get('/', postController.getAllPosts);

export const postRoutes = router;
