import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateBlogDto {
  @ApiProperty({
    description: 'User email',
    example: 'example@mail.ru',
  })
  @IsString()
  @Expose()
  name: string;
}
