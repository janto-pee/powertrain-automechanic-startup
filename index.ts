import express from "express";
import config from "config";
import router from "./prisma/router/routes";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(router);
// app.use(bodyParser.json());

const port = config.get<number>("port");
app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
