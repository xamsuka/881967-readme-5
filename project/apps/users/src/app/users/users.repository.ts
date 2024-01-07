import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/libs/shared/core';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UsersRepository extends BaseMongoRepository<
  UserEntity,
  UserModel
> {
  constructor(@InjectModel(UserModel.name) blogUserModel: Model<UserModel>) {
    super(blogUserModel, UserEntity.fromObject);
  }

  async finByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }
}
