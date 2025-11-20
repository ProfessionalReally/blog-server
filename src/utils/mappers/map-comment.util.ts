import { CommentDocument, UserDocument } from '@/model';
import { Types } from 'mongoose';

type PopulatedCommentDocument = Omit<CommentDocument, 'author'> & {
	author: UserDocument;
};

export const mapComment = (comment: PopulatedCommentDocument | CommentDocument) => {
	if (comment.author instanceof Types.ObjectId) {
		return {
			id: comment._id,
			content: comment.content,
			author: comment.author,
			publishedAt: comment.createdAt,
		};
	}

	return {
		id: comment._id,
		content: comment.content,
		author: comment.author.login,
		publishedAt: comment.createdAt,
	};
};
