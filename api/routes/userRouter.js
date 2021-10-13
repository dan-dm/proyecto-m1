import Router from 'express';
import userController from '../controllers/userController.js';
import authHandler from '../middlewares/authHandler.js';

const router = Router();


router.route('/register')
    .post(authHandler.encryptPassword)
    .post(userController.register);

router.route('/login')
    .post(userController.login);

    
router.use(authHandler.authUser);

router.route('/routes')
    .get(userController.getUserRoutes)
    .post(userController.addUserRoutes)
    .delete(userController.clearUserRoutes);

router.route('/delete/:user')
    .get(userController.deleteUser)

export default router;
