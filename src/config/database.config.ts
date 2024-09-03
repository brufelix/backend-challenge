import { ormConfigOptions } from './orm-config-options.config';
import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm';

export class Database {
  private static instance: DataSource;

  private constructor() {}

  public static async getInstance(): Promise<DataSource> {
    if (!Database.instance) {
      Database.instance = new DataSource(ormConfigOptions);

      await Database.instance.initialize();

      console.info('Data Source has been initialized successfully.');
    }

    return Database.instance;
  }

  public static async getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>
  ): Promise<Repository<T>> {
    const dataSource: DataSource = await Database.getInstance();
    return dataSource.getRepository(entity);
  }
}
