import { User } from '@project/libs/shared/types';
import { SALT_OR_ROUNDS } from './constants/users.constants';
import { hash } from 'bcrypt';

export class UserEntity implements User {
  id: string;
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
  createdAt?: string;

  constructor(user: User) {
    this.populate(user);
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

  populate(user: User) {
    const { email, username, avatarUrl, password, createdAt, id } = user;

    this.id = id;
    this.username = username;
    this.email = email;
    this.avatarUrl = avatarUrl;
    this.password = password;
    this.createdAt = createdAt;
  }

  async setPassword(password: string) {
    const passwordHash = await hash(password, SALT_OR_ROUNDS);

    this.password = passwordHash;

    return this;
  }

  static fromObject(data: User): UserEntity {
    return new UserEntity(data);
  }
}
