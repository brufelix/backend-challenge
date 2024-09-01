import { envs } from '@/constants/envs';
import { DataSourceOptions } from 'typeorm';

export const ormConfigOptions: DataSourceOptions = {
  type: 'postgres',
  host: envs.database.host,
  port: Number(envs.database.port),
  username: envs.database.username,
  password: envs.database.password,
  database: envs.database.databaseName,
  synchronize: !envs.isProd, // production-only enabled.
  entities: [__dirname.replace('/config', '') + '/entities/**/*.ts'],
};
