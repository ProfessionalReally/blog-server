import { config } from '@/config';
import jwt from 'jsonwebtoken';

interface TokenPayload extends jwt.JwtPayload {
	id: string;
}

export const verifyToken = (token: string): TokenPayload | null => {
	try {
		return jwt.verify(token, config.jwtSecret) as TokenPayload;
	} catch {
		return null;
	}
};
