import { PaginationRdo } from '@project/libs/shared/types';
import { PostRdo } from './post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostWithPaginationRdo extends PaginationRdo {
  @ApiProperty({
    description: 'Список постов',
    type: [PostRdo],
  })
  @Expose()
  entities: PostRdo[];
}
