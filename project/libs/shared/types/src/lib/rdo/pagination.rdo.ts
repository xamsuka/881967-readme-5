import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUrl } from 'class-validator';

export class PaginationRdo {
  @ApiProperty({
    description: 'Общее количество страниц',
    example: 10,
  })
  @Expose()
  totalPages: number;

  @ApiProperty({
    description: 'Всего элементов',
    example: 5,
  })
  @Expose()
  totalItems: number;

  @ApiProperty({
    description: 'Текущая страница',
    example: 2,
  })
  @Expose()
  currentPage: number;

  @ApiProperty({
    description: 'Всего элементов на странице',
    example: 5,
  })
  @Expose()
  itemsPerPage: number;
}
