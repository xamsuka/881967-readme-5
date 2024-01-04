import { OmitType } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class LoginUserResponseRdo extends OmitType(UserDto, [
  'password',
] as const) {}
