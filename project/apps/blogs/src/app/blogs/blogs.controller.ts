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
import { fillDto } from '@project/libs/shared/helpers';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRdo } from './rdo/blog.rdo';

@ApiTags('Blogs')
@Controller()
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @ApiResponse({
    type: BlogRdo,
    status: HttpStatus.CREATED,
    description: 'created blog',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiOperation({ summary: 'Создать блог' })
  @Post('/blogs-management/blogs')
  async createOne(@Body() blogInput: CreateBlogDto): Promise<BlogRdo> {
    const blog = await this.blogsService.createOne(blogInput);

    return fillDto(BlogRdo, blog.toPOJO());
  }

  @ApiResponse({
    type: BlogRdo,
    status: HttpStatus.OK,
    description: 'updated blog',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiParam({ name: 'id', required: true, description: 'Идентификатор блога' })
  @ApiOperation({ summary: 'Обновить блог по id' })
  @Patch('/blogs-management/blogs/:id')
  async updateOne(
    @Param() params: { id: string },
    @Body() blogInput: UpdateBlogDto
  ): Promise<BlogRdo> {
    const blog = await this.blogsService.updateOne(params.id, blogInput);

    return fillDto(BlogRdo, blog.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'the blog has been deleted',
  })
  @ApiParam({ name: 'id', required: true, description: 'Идентификатор блога' })
  @ApiOperation({ summary: 'Удалить блог по id' })
  @HttpCode(204)
  @Delete('/blogs-management/blogs/:id')
  async deleteOne(@Param() params: { id: string }): Promise<void> {
    return this.blogsService.deleteOne(params.id);
  }

  @ApiResponse({
    type: [BlogRdo],
    status: HttpStatus.OK,
    description: 'blog list',
  })
  @ApiOperation({ summary: 'Получить список блогов' })
  @Get('/blogs-management/blogs')
  async findAll(): Promise<BlogRdo[]> {
    const blogs = await this.blogsService.findAll();
    console.log('blogs', blogs);
    return blogs.map((blog) => fillDto(BlogRdo, blog.toPOJO()));
  }

  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    type: BlogRdo,
    status: HttpStatus.OK,
    description: 'blog',
  })
  @ApiParam({ name: 'id', required: true, description: 'Идентификатор блога' })
  @ApiOperation({ summary: 'Получить блог по id' })
  @Get('/blogs-management/blogs/:id')
  async findOne(@Param() params: { id: string }): Promise<BlogRdo> {
    const blog = await this.blogsService.findOne(params.id);

    return fillDto(BlogRdo, blog.toPOJO());
  }
}
