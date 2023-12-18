import { OmitType, PickType } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/user.dto';

export class LoginUserRequestDto extends PickType(UserDto, [
  'email',
  'password',
] as const) {}

export class LoginUserResponseDto extends OmitType(UserDto, [
  'password',
] as const) {}
