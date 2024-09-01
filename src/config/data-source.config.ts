import { DataSource } from 'typeorm';
import { ormConfigOptions } from './orm-config-options.config';

export const dataSource: DataSource = new DataSource(ormConfigOptions);
