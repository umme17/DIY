import { Router } from 'express';
import * as userController from './user.controller.js';
const router = Router();
router.post('/create', userController.createUser);
router.get('/all', userController.getAllUsers);
export default router;
//# sourceMappingURL=user.routes.js.map