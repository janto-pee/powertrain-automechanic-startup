import express from "express";
import {
  CreateSessionHandler,
  deleteSessionHandler,
  findSessionHandler,
} from "../controller/SessionController";
import validateResource from "../middleware/validate";
import { createSessionSchema } from "../schema/SessionSchema";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post(
  "/api/sessions",
  validateResource(createSessionSchema),
  CreateSessionHandler
);
router.get("/api/sessions", findSessionHandler);
router.delete("/api/sessions", requireUser, deleteSessionHandler);

export default router;
