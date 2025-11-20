import { Router } from 'express';
import { authRouter, commentRouter, postRouter, userRouter } from './routes';

const router = Router({ mergeParams: true });

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

export { router };
