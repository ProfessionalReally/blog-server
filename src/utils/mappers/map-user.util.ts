import { UserDocument } from '@/model/user.model';
export const mapUser = (user: UserDocument) => {
	return {
		id: user._id,
		login: user.login,
		roleId: user.role,
		registeredAt: user.createdAt,
	};
};
