import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/libs/shared/blogs/models';
import { BasePostgresRepository } from '@project/libs/shared/core';
import { Blog } from '@project/libs/shared/types';
import { BlogEntity } from './entities/blog.entity';

@Injectable()
export class BlogsRepository extends BasePostgresRepository<BlogEntity, Blog> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, BlogEntity.fromObject);
  }

  async createOne(entity: BlogEntity): Promise<BlogEntity> {
    const result = await this.client.blog.create({
      data: entity.toPOJO(),
    });

    entity.id = result.id;

    return entity;
  }

  async deleteOne(id: string): Promise<void> {
    await this.client.blog.delete({
      where: {
        id,
      },
    });
  }

  async findOne(id: string): Promise<BlogEntity | null> {
    const blog = await this.client.blog.findFirst({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });

    return this.createEntityFromDocument(blog);
  }

  async findAll(): Promise<BlogEntity[]> {
    const blogs = await this.client.blog.findMany();

    return blogs.map(this.createEntityFromDocument, this);
  }

  async updateOne(id: string, entity: BlogEntity): Promise<BlogEntity> {
    const updatedBlog = await this.client.blog.update({
      where: {
        id,
      },
      data: entity.toPOJO(),
    });

    return this.createEntityFromDocument(updatedBlog);
  }
}
