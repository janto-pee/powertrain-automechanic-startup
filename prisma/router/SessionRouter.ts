import express from "express";
import {
  CreateSessionHandler,
  deleteSessionHandler,
  findSessionHandler,
} from "../controller/SessionController";

const router = express.Router();

router.post("/api/session", CreateSessionHandler);
router.get("/api/sessions", findSessionHandler);
router.delete("/api/sessions", deleteSessionHandler);

export default router;
