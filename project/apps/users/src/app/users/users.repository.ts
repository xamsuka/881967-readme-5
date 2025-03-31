import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository, BaseQueryParam } from '@project/libs/shared/core';
import { Model } from 'mongoose';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';
import { PaginationResult } from '@project/libs/shared/types';
import { MongoAPIFeatures } from '@project/libs/shared/helpers';

@Injectable()
export class UsersRepository extends BaseMongoRepository<
  UserEntity,
  UserModel
> {
  constructor(@InjectModel(UserModel.name) blogUserModel: Model<UserModel>) {
    super(blogUserModel, UserEntity.fromObject);
  }

  private calculateUsersPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  async finByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();

    return this.createEntityFromDocument(document);
  }

  async findMany(
    query?: BaseQueryParam
  ): Promise<PaginationResult<UserEntity>> {
    const take = query?.limit;
    const page = query.page * 1 || 1;

    const limit = query.limit * 1;

    const skip = page && query?.limit ? (page - 1) * query.limit : 0;

    const count = await this.model.countDocuments().exec();

    const mongooseUserQuery = this.model.find();

    if (query.sortingBy) {
      mongooseUserQuery.sort({
        [query.sortingBy]: query.sortOrder === 'asc' ? 1 : -1,
      });
    } else {
      mongooseUserQuery.sort('-username');
    }

    mongooseUserQuery.skip(skip).limit(limit);

    const users = await mongooseUserQuery.exec();

    return {
      entities: users.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculateUsersPage(count, take),
      itemsPerPage: take,
      totalItems: count,
    };
  }
}
