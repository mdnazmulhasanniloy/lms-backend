import { Router } from 'express';
import { postController } from './post.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constants';
import parseData from '../../middleware/parseData';

const router = Router();

router.post('/', auth(USER_ROLE.user), parseData(), postController.createPost);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  parseData(),
  postController.updatePost,
);
router.delete('/:id', auth(USER_ROLE.user), postController.deletePost);
router.get('/my-posts', postController.getMyPosts);
router.get('/:id', postController.getPostById);
router.get('/', postController.getAllPosts);

export const postRoutes = router;
