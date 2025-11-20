import { PostDocument } from '@/model';
import { Types } from 'mongoose';
import { mapComment } from './map-comment.util';

export const mapPost = (post: PostDocument) => {
	return {
		id: post._id,
		title: post.title,
		content: post.content,
		imageUrl: post.imageUrl,
		comments: post.comments.map((comment) =>
			comment instanceof Types.ObjectId ? comment.toString() : mapComment(comment),
		),
		publishedAt: post.createdAt,
	};
};
