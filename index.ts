import express from "express";
import config from "config";
import router from "./prisma/router/routes";
// import deserializeUser from "./prisma/middleware/deserializeUser";

const app = express();

app.use(express.json());
app.use(router);
// app.use(deserializeUser);

const port = config.get<number>("port");
app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});
