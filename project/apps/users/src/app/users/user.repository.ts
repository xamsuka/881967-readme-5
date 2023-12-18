import { BaseMemoryRepository } from '@project/libs/shared/core';
import { UserEntity } from './user.entity';

export class UserRepository extends BaseMemoryRepository<UserEntity> {}
