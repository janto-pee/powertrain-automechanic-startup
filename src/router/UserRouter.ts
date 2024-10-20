import express from 'express';
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from '../schema/UserSchema';
import {
  CreateUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  passwordResetHandler,
  verifyUserHandler,
} from '../controller/UserController';
import validateResource from '../middleware/validate';

const router = express.Router();

router.post(
  '/api/users',
  validateResource(createUserSchema),
  CreateUserHandler,
);
router.get(
  '/api/users/verify/:id/:verificationcode',
  validateResource(verifyUserSchema),
  verifyUserHandler,
);
router.post(
  '/api/users/forgot-password',
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler,
);
router.post(
  '/api/users/passwordreset/:id/:passwordresetcode',
  validateResource(resetPasswordSchema),
  passwordResetHandler,
);
router.get('/api/user/me', getCurrentUserHandler);

export default router;
