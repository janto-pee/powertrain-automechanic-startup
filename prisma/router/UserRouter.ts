import express from "express";
import validate from "../middleware/validate";
import createUserSchema from "../schema/UserSchema";
import {
  CreateUserHandler,
  forgotPasswordHandler,
  passwordResetHandler,
  verifyUserHandler,
} from "../controller/UserController";

const router = express.Router();

router.post("/api/users", CreateUserHandler);
router.get("/api/users/verify/:username/:verificationcode", verifyUserHandler);
router.post("/api/users/forgot-password", forgotPasswordHandler);
router.post(
  "/api/users/passwordreset/:username/:passwordresetcode",
  passwordResetHandler
);
router.post("/api/user/me", CreateUserHandler);

export default router;
