import { ROLES } from '@/const';
import { addComment, deleteComment, getComment, updateComment } from '@/controller';
import { authMiddleware, hasRoleMiddleware } from '@/middleware';
import { Router } from 'express';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/:id', getComment);

commentRouter.post('/', authMiddleware, addComment);

commentRouter.patch(
	'/:id',
	authMiddleware,
	hasRoleMiddleware([ROLES.ADMIN, ROLES.MODERATOR]),
	(req, res, next) => {
		// @ts-ignore
		req.body = { content: req.body.content, author: req.user?.id, postId: req.body.postId };
		next();
	},
	updateComment,
);

commentRouter.delete(
	'/:id',
	authMiddleware,
	hasRoleMiddleware([ROLES.ADMIN, ROLES.MODERATOR]),
	deleteComment,
);

export { commentRouter };
