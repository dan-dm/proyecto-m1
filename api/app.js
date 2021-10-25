import express from 'express';
import userRouter from './routes/userRouter.js';
import routesRouter from './routes/routesRouter.js';
import searchRouter from './routes/searchRouter.js';
import clientErrorHandler from './middlewares/errorHandler.js';
// import dotenv from 'dotenv';

// dotenv.config()

const app = express();

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/routes', routesRouter);
app.use('/api', searchRouter);
app.use(clientErrorHandler);

export default app;