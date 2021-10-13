import express from 'express';
import userRouter from './api/routes/userRouter.js';
import routesRouter from './api/routes/routesRouter.js';
import searchRouter from './api/routes/searchRouter.js';
import clientErrorHandler from './api/middlewares/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/routes', routesRouter);
app.use('/api', searchRouter);
app.use(clientErrorHandler);

export default app;