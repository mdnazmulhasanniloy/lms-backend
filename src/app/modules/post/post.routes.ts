
import { Router } from 'express';
import { postController } from './post.controller';

const router = Router();

router.post('/', postController.createPost);
router.patch('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/:id', postController.getPostById);
router.get('/', postController.getAllPost);

export const postRoutes = router;