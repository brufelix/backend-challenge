import { DeepPartial, FindOneOptions } from 'typeorm';

export interface IRepository<T> {
  destroy: (id: string) => Promise<void>;
  list: (query: Partial<T>) => Promise<T[]>;
  insert: (data: DeepPartial<T>) => Promise<T>;
  deleteMany?: (ids: string[]) => Promise<void>;
  update: (id: string, data: DeepPartial<T>) => Promise<T>;
  findOne: (options: FindOneOptions<T>) => Promise<T | null>;
}
