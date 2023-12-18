import { User } from '@project/libs/shared/types';
import { randomUUID } from 'crypto';
import { CreateUser } from 'libs/shared/types/src/lib/user.interface';

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
    const { email, username, avatarUrl, createdAt } = user;

    this.id = randomUUID();
    this.username = username;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.createdAt = createdAt;
  }
}
