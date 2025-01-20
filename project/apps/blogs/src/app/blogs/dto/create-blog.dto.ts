import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@mail.ru',
  })
  @IsString()
  @Expose()
  name: string;

  @ApiProperty({
    description: 'User unique uuid key',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @IsUUID()
  @Expose()
  userId: string;
}
