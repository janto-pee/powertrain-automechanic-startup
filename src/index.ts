import express from 'express';
import config from 'config';
import router from './router/routes';
import deserializeUser from './middleware/deserializeUser';

const app = express();

app.use(express.json());
app.use(deserializeUser);
app.use(router);

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
