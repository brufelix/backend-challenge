import { Database } from '@/config/database.config';
import { IRepository } from './Repository.interface';
import { NotFoundError } from '@/helpers/errors/not-found-error';
import {
  Repository,
  DeepPartial,
  EntityTarget,
  ObjectLiteral,
  FindOneOptions,
  FindManyOptions,
  FindOptionsWhere,
} from 'typeorm';

const NOT_FOUND_MESSAGE = 'Not Found.';

export abstract class IRepositoryBase<T extends ObjectLiteral>
  implements IRepository<T>
{
  private repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.initializeRepository(entity);
  }

  private async initializeRepository(entity: EntityTarget<T>) {
    this.repository = await Database.getRepository(entity);
  }

  async insert(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async list(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as unknown as FindOptionsWhere<T>,
    });

    if (!entity) throw new NotFoundError(NOT_FOUND_MESSAGE);

    const updatedEntity = Object.assign(entity, data);
    return this.repository.save(updatedEntity);
  }

  async destroy(id: string): Promise<void> {
    const result = await this.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    }
  }

  async deleteMany(ids: string[]): Promise<void> {
    const result = await this.repository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundError(NOT_FOUND_MESSAGE);
    }
  }
}
