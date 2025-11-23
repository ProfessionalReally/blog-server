import { Comment, Post } from '@/model';
import { mapComment, sendError } from '@/utils';
import { Request, Response } from 'express';

export const addComment = async (req: Request, res: Response) => {
	try {
		const comment = new Comment(req.body);

		// @ts-ignore
		comment.author = req.user?.id;

		await Post.findByIdAndUpdate(req.body.postId, {
			$push: { comments: comment },
		});

		await comment.populate('author');

		await comment.save();
		res.status(201).json({ data: mapComment(comment) });
	} catch (error) {
		sendError(res, error);
	}
};

export const getComment = async (req: Request, res: Response) => {
	try {
		const comment = await Comment.findById(req.params.id);
		if (!comment) {
			return res.status(404).json({ error: 'Comment not found' });
		}
		res.status(200).json({ data: mapComment(comment) });
	} catch (error) {
		sendError(res, error);
	}
};

export const deleteComment = async (req: Request, res: Response) => {
	try {
		await Comment.deleteOne({ _id: req.params.id });
		await Post.findByIdAndUpdate(req.body.postId, {
			$pull: { comments: req.params.id },
		});
		res.status(200).json({ error: null });
	} catch (error) {
		sendError(res, error);
	}
};

export const updateComment = async (req: Request, res: Response) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: 'after',
		});

		if (!comment) {
			return res.status(404).json({ error: 'Comment not found' });
		}

		res.status(200).json({ data: mapComment(comment) });
	} catch (error) {
		sendError(res, error);
	}
};
