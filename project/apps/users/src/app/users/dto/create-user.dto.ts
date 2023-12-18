import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserRequestDto extends PickType(UserDto, [
  'email',
  'password',
  'username',
  'avatarUrl',
] as const) {}
