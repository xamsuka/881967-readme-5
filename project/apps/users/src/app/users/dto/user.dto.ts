import { ApiProperty } from '@nestjs/swagger';
import { CreateUserRequestDto } from './create-user.dto';

export class UserDto {
  @ApiProperty({
    description: 'User unique uuid key',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'example@mail.ru',
  })
  email: string;

  @ApiProperty({
    description: 'User username',
    example: 'Vladislav Kozovsky',
  })
  username: string;

  @ApiProperty({
    description: 'User password',
    example: '123321',
  })
  password: string;

  @ApiProperty({
    description: 'User avatar url',
    example: 'https://example.ru/image.png',
  })
  avatarUrl?: string;

  @ApiProperty({
    description: 'User created date',
    example: '2022-08-03T11:21:40+0000',
  })
  createdAt?: string;
}
