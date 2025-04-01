import { OmitType } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class UserWithoutPasswordRdo extends OmitType(UserDto, [
  'password',
] as const) {}

export class LoginUserResponseRdo {
  user: UserWithoutPasswordRdo;
  token: string;
}
