import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserWithPaginationRdo } from './rdo/user-with-pagination.rdo';
import { BaseQueryParam } from '@project/libs/shared/core';
import { fillDto } from '@project/libs/shared/helpers';
import { PaginationResult } from '@project/libs/shared/types';

import { UsersService } from './users.service';
import { UserRdo } from './rdo/user.rdo';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @ApiResponse({
    type: UserWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Список пользователей',
  })
  @ApiQuery({
    name: 'sortOrder',
    description: 'Вид сортировки (asc/desc)',
    example: 'desc',
    required: false,
  })
  @ApiQuery({
    name: 'sortBy',
    description: 'Поле сортировки',
    required: false,
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Количество элементов',
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    description: 'Текущий номер страницы',
    required: false,
    example: 1,
  })
  @ApiOperation({ summary: 'Получить список пользователей' })
  @Get('/users-management/users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll(
    @Query() query?: BaseQueryParam
  ): Promise<PaginationResult<UserRdo>> {
    const usersWithPagination = await this.userService.getUsers(query);

    const result = {
      ...usersWithPagination,
      entities: fillDto(
        UserRdo,
        usersWithPagination.entities.map((user) => user.toPOJO())
      ),
    };

    return fillDto(UserWithPaginationRdo, result);
  }

  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Пост',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор польтзователя',
  })
  @ApiOperation({
    summary: 'Получить детальную информацию по пользователю по id',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/users-management/users/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserRdo> {
    const post = await this.userService.getUserById(id);

    return fillDto(UserRdo, post.toPOJO());
  }
}
