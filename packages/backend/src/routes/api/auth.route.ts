import { Router } from 'express';
import { tryCatchWrap } from '../../middlewares/try-catch.middleware';
import authController from '../../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post('/signup', tryCatchWrap(authController.signUp.bind(authController)));
authRouter.post('/signin', tryCatchWrap(authController.signIn.bind(authController)));

export default authRouter;
