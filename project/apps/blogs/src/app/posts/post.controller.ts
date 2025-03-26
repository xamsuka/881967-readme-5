import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/libs/shared/helpers';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseQueryParam } from '@project/libs/shared/core';
import { PostWithPaginationRdo } from './rdo/post-with-pagination-rdo';
import { PaginationResult } from '@project/libs/shared/types';

@ApiTags('Posts')
@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Пост',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Создать пост' })
  @Post('/posts-management/posts')
  async createOne(@Body() postInput: CreatePostDto): Promise<PostRdo> {
    const post = await this.postService.createPost(postInput);

    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Пост',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'id', required: true, description: 'Идентификатор поста' })
  @ApiOperation({ summary: 'Обновить пост по id' })
  @Patch('/posts-management/posts/:id')
  async updateOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() postInput: UpdatePostDto
  ): Promise<PostRdo> {
    const post = await this.postService.updatePost(id, postInput);

    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Пост удален',
  })
  @ApiParam({ name: 'id', required: true, description: 'Идентификатор поста' })
  @ApiOperation({ summary: 'Удалить пост по id' })
  @HttpCode(204)
  @Delete('/posts-management/posts/:id')
  async deleteOne(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.postService.deletePost(id);
  }

  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Пост',
  })
  @ApiParam({ name: 'id', required: true, description: 'Идентификатор поста' })
  @ApiOperation({ summary: 'Получить пост по id' })
  @Get('/posts-management/posts/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PostRdo> {
    const post = await this.postService.getPost(id);

    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: PostWithPaginationRdo,
    status: HttpStatus.OK,
    description: 'Список постов',
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
  @ApiOperation({ summary: 'Получить список постов' })
  @Get('/posts-management/posts')
  async findAll(
    @Query() query?: BaseQueryParam
  ): Promise<PaginationResult<PostRdo>> {
    const postsWithPagination = await this.postService.getPosts(query);

    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };

    return fillDto(PostWithPaginationRdo, result);
  }
}
