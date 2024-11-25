import express from 'express';
import { getUserInfo } from '../Controller/userController';


const router = express.Router();

router.get('/:id', getUserInfo);

export default router;
