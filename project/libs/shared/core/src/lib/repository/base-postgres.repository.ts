import { Entity } from '@project/libs/shared/types';
import { PrismaClientService } from 'libs/shared/blogs/models/src';
import {
  DefaultPojoType,
  EntityIdType,
} from 'libs/shared/types/src/lib/entity.interface';
import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<
  EntityType extends Entity<EntityIdType, PojoType>,
  PojoType = DefaultPojoType
> implements Repository<EntityType, PojoType>
{
  constructor(
    protected readonly client: PrismaClientService,
    private readonly createEntity: (document: PojoType) => EntityType
  ) {}

  protected createEntityFromDocument(document: PojoType): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document);
  }

  findOne(id: EntityType['id']): Promise<EntityType> {
    throw new Error('Method not implemented.');
  }

  createOne(entity: EntityType): Promise<EntityType> {
    throw new Error('Method not implemented.');
  }

  deleteOne(id: EntityType['id']): Promise<void> {
    throw new Error('Method not implemented.');
  }

  updateOne(id: EntityType['id'], entity: EntityType): Promise<EntityType> {
    throw new Error('Method not implemented.');
  }
}
