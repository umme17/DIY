import express from 'express';
import userRoutes from './modules/user/user.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import cors from 'cors';
import {errorHandler} from './middlewares/errHandler.js';

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;

