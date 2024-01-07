import { User } from '@project/libs/shared/types';
import { randomUUID } from 'crypto';
import { CreateUser } from 'libs/shared/types/src/lib/user.interface';
import { SALT_OR_ROUNDS } from './constants/users.constants';
import { hash } from 'bcrypt';

export class UserEntity implements User {
  id: string;
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
  createdAt?: string;

  constructor(createUser: CreateUser) {
    this.populate(createUser);
  }

  toPOJO() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      password: this.password,
      avatarUrl: this.avatarUrl,
      createdAt: this.createdAt,
    };
  }

  populate(user: CreateUser) {
    const { email, username, avatarUrl, password } = user;

    this.username = username;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.password = password;
  }

  async setPassword(password: string) {
    const passwordHash = await hash(password, SALT_OR_ROUNDS);

    this.password = passwordHash;

    return this;
  }

  static fromObject(data: CreateUser): UserEntity {
    return new UserEntity(data);
  }
}
