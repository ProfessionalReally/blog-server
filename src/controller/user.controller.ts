import { cookieOptions } from '@/config';
import { ROLES } from '@/const';
import { User } from '@/model';
import { generateToken, mapUser, sendError } from '@/utils';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { login, password } = req.body;

		const existing = await User.findOne({ login });
		if (existing) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const hash = await bcrypt.hash(password, 10);
		const user = new User({ login, password: hash });

		await user.save();

		const token = generateToken({ id: user._id });

		res.cookie('token', token, cookieOptions);

		res.status(201).json({
			error: null,
			data: mapUser(user),
		});
	} catch (error) {
		sendError(res, error);
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { login, password } = req.body;

		const user = await User.findOne({ login });

		if (!user) {
			return res.status(400).json({ error: 'User not found' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ error: 'Invalid credentials' });
		}

		const token = generateToken({ id: user._id });

		res.cookie('token', token, cookieOptions);

		res.status(200).json({
			error: null,
			data: mapUser(user),
		});
	} catch (error) {
		sendError(res, error);
	}
};

export const logoutUser = (req: Request, res: Response) => {
	res.clearCookie('token', cookieOptions);
	res.status(200).json({});
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json({ data: users.map(mapUser) });
	} catch (error) {
		sendError(res, error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json({ error: null });
	} catch (error) {
		sendError(res, error);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: 'after',
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.status(200).json({ data: mapUser(user) });
	} catch (error) {
		sendError(res, error);
	}
};

export const getRoles = async (req: Request, res: Response) => {
	try {
		const roles = Object.entries(ROLES).map(([name, id]) => ({
			id,
			name,
		}));

		res.status(200).json({ data: roles });
	} catch (error) {
		sendError(res, error);
	}
};
