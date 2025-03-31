import { PaginationRdo } from '@project/libs/shared/types';
import { UserRdo } from './user.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserWithPaginationRdo extends PaginationRdo {
  @ApiProperty({
    description: 'Список пользотвалей',
    type: [UserRdo],
  })
  @Expose()
  entities: UserRdo[];
}
