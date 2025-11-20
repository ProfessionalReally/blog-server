import { ROLES } from '@/const';
import { deleteUser, getRoles, getUsers, updateUser } from '@/controller';
import { authMiddleware, hasRoleMiddleware } from '@/middleware';
import { Router } from 'express';

const userRouter = Router({ mergeParams: true });

userRouter.get('/', authMiddleware, hasRoleMiddleware([ROLES.ADMIN]), getUsers);

userRouter.patch(
	'/:id',
	authMiddleware,
	hasRoleMiddleware([ROLES.ADMIN]),
	(req, res, next) => {
		req.body = { role: req.body.role };
		next();
	},
	updateUser,
);

userRouter.delete('/:id', authMiddleware, hasRoleMiddleware([ROLES.ADMIN]), deleteUser);

userRouter.get('/roles', authMiddleware, hasRoleMiddleware([ROLES.ADMIN]), getRoles);

export { userRouter };
