import { Injectable } from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/client';
import { PrismaClientService } from '@project/libs/shared/blogs/models';
import {
  BasePostgresRepository,
  BaseQueryParam,
} from '@project/libs/shared/core';
import { PaginationResult, Post } from '@project/libs/shared/types';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, Post> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, PostEntity.fromObject);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  async createOne(entity: PostEntity): Promise<PostEntity> {
    const {
      blogId,
      status,
      type,
      tags,
      imageContent,
      linkContent,
      quoteContent,
      textContent,
      videoContent,
    } = entity.toPOJO();

    const imageContentCreateInput: Prisma.PostCreateInput['imageContent'] =
      imageContent && type === $Enums.ContentType.IMAGE
        ? { create: { ...imageContent } }
        : undefined;

    const linkContentCreateInput: Prisma.PostCreateInput['linkContent'] =
      linkContent && type === $Enums.ContentType.LINK
        ? { create: { ...linkContent } }
        : undefined;

    const quoteContentCreateInput: Prisma.PostCreateInput['quoteContent'] =
      quoteContent && type === $Enums.ContentType.QUOTE
        ? { create: { ...quoteContent } }
        : undefined;

    const textContentCreateInput: Prisma.PostCreateInput['textContent'] =
      textContent && type === $Enums.ContentType.TEXT
        ? { create: { ...textContent } }
        : undefined;

    const videoContentCreateInput: Prisma.PostCreateInput['videoContent'] =
      videoContent && type === $Enums.ContentType.VIDEO
        ? { create: { ...videoContent } }
        : undefined;

    const result = await this.client.post.create({
      data: {
        blogId,
        status,
        type,
        likeCount: 0,
        tags,
        imageContent: imageContentCreateInput,
        linkContent: linkContentCreateInput,
        quoteContent: quoteContentCreateInput,
        textContent: textContentCreateInput,
        videoContent: videoContentCreateInput,
      },
      include: {
        imageContent: true,
        linkContent: true,
        quoteContent: true,
        textContent: true,
        videoContent: true,
      },
    });

    return this.createEntityFromDocument(result);
  }

  async deleteOne(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  async findOne(id: string): Promise<PostEntity | null> {
    const post = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        imageContent: true,
        linkContent: true,
        quoteContent: true,
        textContent: true,
        videoContent: true,
      },
    });

    return this.createEntityFromDocument(post);
  }

  async findAll(query?: BaseQueryParam): Promise<PaginationResult<PostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (query?.sortOrder && !query.sortingBy) {
      orderBy.createdAt = query.sortOrder;
    }

    if (query?.sortOrder && query.sortingBy && orderBy[query.sortingBy]) {
      orderBy[query.sortingBy] = query.sortOrder;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          imageContent: true,
          linkContent: true,
          quoteContent: true,
          textContent: true,
          videoContent: true,
        },
      }),
      this.getPostCount(where),
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }

  async updateOne(id: string, entity: PostEntity): Promise<PostEntity> {
    const {
      blogId,
      status,
      type,
      tags,
      imageContent,
      linkContent,
      quoteContent,
      textContent,
      videoContent,
    } = entity.toPOJO();

    const imageContentUpdateInput: Prisma.PostUpdateInput['imageContent'] =
      imageContent && type === $Enums.ContentType.IMAGE
        ? {
            update: {
              data: imageContent,
            },
          }
        : undefined;

    const linkContentUpdateInput: Prisma.PostUpdateInput['linkContent'] =
      linkContent && type === $Enums.ContentType.LINK
        ? {
            update: {
              data: linkContent,
            },
          }
        : undefined;

    const quoteContentUpdateInput: Prisma.PostUpdateInput['quoteContent'] =
      quoteContent && type === $Enums.ContentType.QUOTE
        ? {
            update: {
              data: quoteContent,
            },
          }
        : undefined;

    const textContentUpdateInput: Prisma.PostUpdateInput['textContent'] =
      textContent && type === $Enums.ContentType.TEXT
        ? {
            update: {
              data: textContent,
            },
          }
        : undefined;

    const videoContentUpdateInput: Prisma.PostUpdateInput['videoContent'] =
      videoContent && type === $Enums.ContentType.VIDEO
        ? {
            update: {
              data: videoContent,
            },
          }
        : undefined;

    const updatedPost = await this.client.post.update({
      where: {
        id,
      },
      data: {
        blogId,
        status,
        type,
        tags,
        imageContent: imageContentUpdateInput,
        linkContent: linkContentUpdateInput,
        quoteContent: quoteContentUpdateInput,
        textContent: textContentUpdateInput,
        videoContent: videoContentUpdateInput,
      },
      include: {
        imageContent: true,
        linkContent: true,
        quoteContent: true,
        textContent: true,
        videoContent: true,
      },
    });

    return this.createEntityFromDocument(updatedPost);
  }
}
