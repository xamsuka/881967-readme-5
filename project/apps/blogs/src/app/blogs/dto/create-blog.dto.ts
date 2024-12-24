import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateBlogDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@mail.ru',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'User unique uuid key',
    example: '3422b448-2460-4fd2-9183-8000de6f8343',
  })
  @Expose()
  userId: string;
}
