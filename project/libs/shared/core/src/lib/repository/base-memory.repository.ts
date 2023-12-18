import { Entity } from '@project/libs/shared/types';
import { Repository } from './repository.interface';
import { EntityIdType } from 'libs/shared/types/src/lib/entity.interface';
import { randomUUID } from 'crypto';

export abstract class BaseMemoryRepository<T extends Entity<EntityIdType>>
  implements Repository<T>
{
  protected entities: Map<string, T>;

  async findOne(id: T['id']): Promise<T> {
    return this.entities.get(id);
  }
  async createOne(entity: Omit<T, 'id'>): Promise<T> {
    const entityId = randomUUID();

    const newEntity = {
      id: entityId,
      ...entity,
    } as T;

    this.entities.set(entityId, newEntity);

    return newEntity;
  }

  async deleteOne(id: T['id']): Promise<void> {
    this.entities.delete(id);

    return;
  }

  async updateOne(id: string, entity: T): Promise<T> {
    if (!this.entities.has(id)) {
      throw new Error(`Entity with id ${id} does not exist`);
    }

    this.entities.set(id, { ...entity, id });

    return entity;
  }
}
