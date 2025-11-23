import { Post } from '@/model';
import { mapPost, sendError } from '@/utils';
import { Request, Response } from 'express';

export const addPost = async (req: Request, res: Response) => {
	try {
		const post = await Post.create(req.body);

		await post.populate({
			path: 'comments',
			populate: { path: 'author' },
		});

		res.status(201).json({ data: mapPost(post) });
	} catch (error) {
		sendError(res, error);
	}
};

export const getPosts = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const search = (req.query.search as string) || '';
		const skip = (page - 1) * limit;

		const filter = search ? { title: { $regex: search, $options: 'i' } } : {};

		const [posts, total] = await Promise.all([
			Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
			Post.countDocuments(filter),
		]);

		res.status(200).json({
			data: {
				data: posts.map(mapPost),
				pagination: {
					page,
					limit,
					total,
					lastPage: Math.ceil(total / limit),
				},
			},
		});
	} catch (error) {
		sendError(res, error);
	}
};

export const getPost = async (req: Request, res: Response) => {
	try {
		const post = await Post.findById(req.params.id).populate({
			path: 'comments',
			populate: { path: 'author' },
		});
		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}
		res.status(200).json({ data: mapPost(post) });
	} catch (error) {
		sendError(res, error);
	}
};

export const deletePost = async (req: Request, res: Response) => {
	try {
		await Post.findByIdAndDelete(req.params.id);
		res.status(200).json({ error: null });
	} catch (error) {
		sendError(res, error);
	}
};

export const updatePost = async (req: Request, res: Response) => {
	try {
		const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: 'after',
		});

		if (!post) {
			return res.status(404).json({ error: 'Post not found' });
		}

		await post.populate({
			path: 'comments',
			populate: { path: 'author' },
		});

		res.status(200).json({ data: mapPost(post) });
	} catch (error) {
		sendError(res, error);
	}
};
