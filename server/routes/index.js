
import { Router } from 'express';
const router = Router();
import menuRouter from './menu';
import authRouter from './auth';

const routes = {
menu : router.use('/menu', menuRouter),
auth : router.use('/auth', authRouter),
};

export default routes;