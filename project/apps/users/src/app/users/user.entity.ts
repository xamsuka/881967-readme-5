import { User } from '@project/libs/shared/types';

export class UserEntity implements User {
  id: string;
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
  createdAt?: string;
}
