import 'dotenv/config';
import 'module-alias/register';

import { DataSource } from 'typeorm';
import { envs } from '@/constants/envs';
import express, { Application } from 'express';
import { dataSource } from './config/data-source.config';

class Server {
  private port: number;
  private app: Application;
  private dataSource: DataSource;

  constructor() {
    this.app = express();
    this.dataSource = dataSource;
    this.port = Number(envs.port);

    this.configureMiddleware();
  }

  private configureMiddleware(): void {
    this.app.use(express.json());
  }

  private async initializeDataSource(): Promise<void> {
    try {
      await this.dataSource.initialize();
      console.info('Data Source has been initialized.');
    } catch (err) {
      console.error(`Data Source initialization error: ${err}`);

      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    await this.initializeDataSource();

    this.app.listen(this.port, () => {
      console.info(`Server running on port ${this.port}.`);
    });
  }
}

const server = new Server();
server.start();
