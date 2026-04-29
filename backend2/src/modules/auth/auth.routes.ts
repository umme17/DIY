import {Router} from 'express';
import * as authController from './auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-up', authController.createUser);
authRouter.post('/login', authController.loginUser);
authRouter.post('/refresh-token', authController.refreshToken);
authRouter.post('/logout', authController.logoutUser);

export default authRouter;