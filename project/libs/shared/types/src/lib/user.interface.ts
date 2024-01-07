export interface User {
  id?: string;
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
}

export interface CreateUser extends Omit<User, 'id'> {}
