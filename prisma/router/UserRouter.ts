import express from "express";
import validate from "../middleware/validate";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schema/UserSchema";
import {
  CreateUserHandler,
  forgotPasswordHandler,
  passwordResetHandler,
  verifyUserHandler,
} from "../controller/UserController";
import validateResource from "../middleware/validate";

const router = express.Router();

router.post(
  "/api/users",
  validateResource(createUserSchema),
  CreateUserHandler
);
router.get(
  "/api/users/verify/:id/:verificationcode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);
router.post(
  "/api/users/forgot-password",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);
router.post(
  "/api/users/passwordreset/:id/:passwordresetcode",
  validateResource(resetPasswordSchema),
  passwordResetHandler
);
router.post("/api/user/me", CreateUserHandler);

export default router;
