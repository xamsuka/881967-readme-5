import { Entity } from '@project/libs/shared/types';
import { Repository } from './repository.interface';
import { EntityIdType } from 'libs/shared/types/src/lib/entity.interface';
import { Model, Document } from 'mongoose';
import { NotFoundException } from '@nestjs/common';

export abstract class BaseMongoRepository<
  EntityType extends Entity<EntityIdType>,
  DocumentType extends Document
> implements Repository<EntityType>
{
  constructor(
    protected readonly model: Model<DocumentType>,
    private readonly createEntity: (document: DocumentType) => EntityType
  ) {}

  protected createEntityFromDocument(
    document: DocumentType
  ): EntityType | null {
    if (!document) {
      return null;
    }

    return this.createEntity(document.toObject({ versionKey: false }));
  }

  async findOne(id: EntityType['id']): Promise<EntityType | null> {
    const document = await this.model.findById(id).exec();
    return this.createEntityFromDocument(document);
  }

  async createOne(entity: EntityType): Promise<EntityType> {
    const newEntity = new this.model(entity.toPOJO());
    await newEntity.save();

    return this.createEntityFromDocument(newEntity);
  }

  async deleteOne(id: EntityType['id']): Promise<void> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found.`);
    }
  }

  async updateOne(
    id: EntityType['id'],
    entity: EntityType
  ): Promise<EntityType> {
    const updatedDocument = await this.model
      .findByIdAndUpdate(id, entity.toPOJO(), {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedDocument) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }

    return entity;
  }
}
