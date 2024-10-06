import express from "express";
import validate from "../middleware/validate";
import createUserSchema from "../schema/UserSchema";
import { CreateUserHandler } from "../controller/UserController";

const router = express.Router();

router.post("/api/users", CreateUserHandler);
router.get("/api/users/verify/:username/:verificationcode", CreateUserHandler);
router.post("/api/users/forgot-password", CreateUserHandler);
router.post(
  "/api/users/passwordreset/:username/:passwordresetcode",
  CreateUserHandler
);
router.post("/api/user/me", CreateUserHandler);

export default router;
