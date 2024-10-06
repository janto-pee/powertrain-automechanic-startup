import express from "express";
import UserRouter from "./UserRouter";
import Sessionrouter from "./SessionRouter";

const router = express.Router();

router.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

router.use(UserRouter);
router.use(Sessionrouter);

export default router;
