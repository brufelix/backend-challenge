import 'dotenv/config';
import 'module-alias/register';

import cors from 'cors';
import router from './routes';
import { envs } from '@/constants/envs';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger-config';
import express, { Application } from 'express';

class Server {
  private port: number;
  private app: Application;

  constructor() {
    this.app = express();
    this.port = Number(envs.port);

    this.configureMiddleware();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    this.app.use(router);
  }

  public async start(): Promise<void> {
    this.app.listen(this.port, () => {
      console.info(`Server running on port ${this.port}.`);
      console.info('Swagger docs available at http://localhost:3333/api-docs');
    });
  }
}

const server = new Server();
server.start();
