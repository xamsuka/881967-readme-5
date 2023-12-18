import { BaseMemoryRepository } from '@project/libs/shared/core';
import { UserEntity } from './user.entity';

export class UsersRepository extends BaseMemoryRepository<UserEntity> {
  finByEmail(email: string) {
    const entities = Array.from(this.entities.values());
    const user = entities.find((entity) => entity.email === email);
    return Promise.resolve(user);
  }
}
