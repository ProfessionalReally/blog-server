import { config } from '@/config';
import { UserDocument } from '@/model';
import jwt from 'jsonwebtoken';

export const generateToken = (data: Partial<UserDocument>) => {
	return jwt.sign(data, config.jwtSecret, {
		expiresIn: '1h',
	});
};
