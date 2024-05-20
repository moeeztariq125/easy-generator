import { Router } from 'express';
import { controllers } from '../../loaders';
import {
  checkValidator,
  signUpCompleteValidator,
  signinValidator,
} from '../validations/Auth.validator';
import { authenticate, validateRequest } from '../../middlewares';

const authRouter = Router();
authRouter
  .post('/check', checkValidator, validateRequest, controllers.userController.check)
  .post('/sign-up', signUpCompleteValidator, validateRequest, controllers.userController.createUser)
  .post('/sign-in', signinValidator, validateRequest, controllers.userController.signIn)
  .get('/protected', authenticate, controllers.userController.protectedAPI);
export { authRouter };
