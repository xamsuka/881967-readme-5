import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RestorePasswordRequestDto {
  @ApiProperty({
    description: 'User old password',
    example: '123321',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  currentPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: '123321',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
