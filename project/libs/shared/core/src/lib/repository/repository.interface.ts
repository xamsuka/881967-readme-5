import { Entity, PartialBy } from '@project/libs/shared/types';
import { EntityIdType } from 'libs/shared/types/src/lib/entity.interface';

export interface Repository<T extends Entity<EntityIdType>> {
  findOne(id: T['id']): Promise<T>;
  createOne(entity: PartialBy<T, 'id'>): Promise<T>;
  deleteOne(id: T['id']): Promise<void>;
  updateOne(id: T['id'], entity: T): Promise<T>;
}
