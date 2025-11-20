import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';
import validator from 'validator';

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
			validate: {
				validator: (value: string) => validator.isURL(value),
				message: 'Image should be a valid URL',
			},
		},
		content: {
			type: String,
			required: true,
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true },
);

export const Post = mongoose.model('Post', PostSchema);

export type PostType = InferSchemaType<typeof PostSchema>;

export type PostDocument = HydratedDocument<PostType>;
