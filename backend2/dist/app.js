import express from 'express';
import userRoutes from './modules/user/user.routes.js';
import cors from 'cors';
import { errorHandler } from './middlewares/errHandler.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map