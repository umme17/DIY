import {Router} from 'express';
import * as userController from './user.controller.js';
import {authMiddleware} from '../../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get('/all', userController.getAllUsers);


export default userRouter;