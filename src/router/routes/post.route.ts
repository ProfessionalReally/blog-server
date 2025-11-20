import { ROLES } from '@/const';
import { addPost, deletePost, getPost, getPosts, updatePost } from '@/controller';
import { authMiddleware, hasRoleMiddleware } from '@/middleware';
import { Router } from 'express';

const postRouter = Router({ mergeParams: true });

postRouter.get('/:id', getPost);

postRouter.get('/', getPosts);

postRouter.post('/', authMiddleware, hasRoleMiddleware([ROLES.ADMIN]), addPost);

postRouter.patch('/:id', authMiddleware, hasRoleMiddleware([ROLES.ADMIN]), updatePost);

postRouter.delete('/:id', authMiddleware, hasRoleMiddleware([ROLES.ADMIN]), deletePost);

export { postRouter };
