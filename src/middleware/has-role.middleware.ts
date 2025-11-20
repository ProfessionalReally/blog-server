import { Roles } from '@/const';
import { NextFunction, Request, Response } from 'express';

export const hasRoleMiddleware = (roles: Roles[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		// @ts-ignore
		const userRole = Number(req.user?.role) as Roles;

		if (userRole === undefined || !roles.includes(userRole)) {
			return res.status(403).json({ error: 'Forbidden access' });
		}
		next();
	};
};
