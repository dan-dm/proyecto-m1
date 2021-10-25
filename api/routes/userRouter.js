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
    .put(userController.deleteUserRoute)
    .delete(userController.clearUserRoutes);

router.route('/:user')
    .delete(userController.deleteUser)

router.route('/')
    .get(userController.getUsers);

export default router;
