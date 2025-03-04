import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { fillDto } from '@project/libs/shared/helpers';
import { UpdatePostDto } from './dto/update-post.dto';

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
    @Param() params: { id: string },
    @Body() postInput: UpdatePostDto
  ): Promise<PostRdo> {
    const post = await this.postService.updatePost(params.id, postInput);

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
  async deleteOne(@Param() params: { id: string }): Promise<void> {
    return this.postService.deletePost(params.id);
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
  async findOne(@Param() params: { id: string }): Promise<PostRdo> {
    const post = await this.postService.getPost(params.id);

    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: [PostRdo],
    status: HttpStatus.OK,
    description: 'Список постов',
  })
  @ApiOperation({ summary: 'Получить список постов' })
  @Get('/posts-management/posts')
  async findAll(): Promise<PostRdo[]> {
    const posts = await this.postService.getPosts();

    return posts.map((post) => fillDto(PostRdo, post.toPOJO()));
  }
}
