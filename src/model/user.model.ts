import { ROLES } from '@/const';
import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: ROLES.USER,
		},
	},
	{ timestamps: true },
);

export const User = mongoose.model('User', UserSchema);

export type UserType = InferSchemaType<typeof UserSchema>;

export type UserDocument = HydratedDocument<UserType>;
