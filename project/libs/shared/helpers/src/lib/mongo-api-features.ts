import { BaseQueryParam } from '@project/libs/shared/core';

export class MongoAPIFeatures {
  mongooseQuery: any;
  queryString: BaseQueryParam;

  constructor(mongooseQuery: any, queryString: BaseQueryParam) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  sorting() {
    if (this.queryString.sortingBy) {
      this.mongooseQuery = this.mongooseQuery.sort({
        [this.queryString.sortingBy]:
          this.queryString.sortOrder === 'asc' ? 1 : -1,
      });
    } else {
      this.mongooseQuery = this.mongooseQuery.sort('-created');
    }

    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;

    const limit = this.queryString.limit * 1;

    const skip =
      page && this.queryString?.limit ? (page - 1) * this.queryString.limit : 0;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }
}
