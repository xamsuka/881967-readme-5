import { CreateUserRequestDto } from './create-user.dto';

export class UserDto {
  id: string;
  email: string;
  username: string;
  password: string;
  avatarUrl?: string;
  createdAt?: string;
}