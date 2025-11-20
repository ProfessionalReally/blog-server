import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';

const CommentSchema = new mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		postId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post',
			required: true,
		},
	},
	{ timestamps: true },
);

export const Comment = mongoose.model('Comment', CommentSchema);

export type CommentType = InferSchemaType<typeof CommentSchema>;

export type CommentDocument = HydratedDocument<CommentType>;
