import Router from 'express';
import routesController from '../controllers/routesController.js';

const router = Router();


router.route('/')
    .get(routesController.getRoutes)


export default router;
