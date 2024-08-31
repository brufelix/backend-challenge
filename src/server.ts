import { DataSource } from 'typeorm';
import { envs } from '@/constants/envs';
import express, { Application } from 'express';
import { ormConfigOptions } from './config/orm-config-options';

import 'module-alias/register';

class Server {
  private port: number;
  private app: Application;
  private dataSource: DataSource;

  constructor() {
    this.app = express();
    this.port = Number(envs.port);
    this.dataSource = new DataSource(ormConfigOptions);

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
