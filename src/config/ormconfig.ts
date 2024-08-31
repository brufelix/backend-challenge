import { envs } from '@/constants/envs';
import { DataSourceOptions } from 'typeorm';

export const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: envs.database.host,
  port: Number(envs.database.port),
  username: envs.database.username,
  password: envs.database.password,
  database: envs.database.databaseName,
  entities: [__dirname + '/entity/**/*.ts'],
  synchronize: !envs.isProd, // production-only enabled.
};
