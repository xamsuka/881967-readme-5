import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private blogRepository: BlogsRepository) {}

  async createOne(blogInput: CreateBlogDto): Promise<BlogEntity> {
    try {
      const newBlog = BlogEntity.fromObject(blogInput);
      return await this.blogRepository.createOne(newBlog);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Блог с наименованием "${blogInput.name}" уже существует.`
        );
      }

      throw error;
    }
  }

  async updateOne(id: string, blogInput: UpdateBlogDto): Promise<BlogEntity> {
    try {
      const currentBlog = await this.findOne(id);

      const blog = BlogEntity.fromObject({
        ...blogInput,
        userId: currentBlog.userId,
      });

      return await this.blogRepository.updateOne(id, blog);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Блог с наименованием "${blogInput.name}" уже существует.`
        );
      }

      throw error;
    }
  }

  async deleteOne(id: string): Promise<void> {
    try {
      await this.blogRepository.deleteOne(id);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Блог с идентификатором ${id} не найден.`);
      }

      throw error;
    }
  }

  async findOne(id: string): Promise<BlogEntity> {
    const blogEntity = await this.blogRepository.findOne(id);

    if (!blogEntity) {
      throw new NotFoundException(`Блог с идентификатором ${id} не найден.`);
    }

    return blogEntity;
  }

  findAll(): Promise<BlogEntity[]> {
    return this.blogRepository.findAll();
  }
}
