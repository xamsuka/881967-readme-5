import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UpdateBlogDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@mail.ru',
  })
  @Expose()
  name: string;

  @Exclude()
  userId: string;
}
