import 'module-alias/register';

import { envs } from '@/constants/envs';
import express, { Application } from 'express';

const port = envs.port;
const app: Application = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
