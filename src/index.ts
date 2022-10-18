import express from "express";
import { log } from "./utils/log";
import config from "config";
import { connect } from "./utils/connect";
import { routes } from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();
app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  routes(app);
  await connect();
  log.info(`running on port ${port}`);
});
