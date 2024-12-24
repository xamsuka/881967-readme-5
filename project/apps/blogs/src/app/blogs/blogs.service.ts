import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(private blogRepository: BlogsRepository) {}

  createOne(blogInput: CreateBlogDto): Promise<BlogEntity> {
    const newBlog = BlogEntity.fromObject(blogInput);

    return this.blogRepository.createOne(newBlog);
  }

  updateOne(id: string, blogInput: UpdateBlogDto): Promise<BlogEntity> {
    const blog = BlogEntity.fromObject(blogInput);

    return this.blogRepository.updateOne(id, blog);
  }

  deleteOne(id: string): Promise<void> {
    return this.blogRepository.deleteOne(id);
  }

  findOne(id: string): Promise<BlogEntity> {
    return this.blogRepository.findOne(id);
  }

  findAll(): Promise<BlogEntity[]> {
    return this.blogRepository.findAll();
  }
}
