import {
  ConflictException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './entities/post.entity';
import { Prisma } from '@prisma/client';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async createPost(postInput: CreatePostDto): Promise<PostEntity> {
    try {
      const newPost = PostEntity.fromObject(postInput);
      return await this.postRepository.createOne(newPost);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new NotFoundException(
          `Блог с id "${postInput.blogId}" не существует.`
        );
      }

      throw error;
    }
  }

  async updatePost(id: string, patchInput: UpdatePostDto): Promise<PostEntity> {
    try {
      const post = await this.postRepository.findOne(id);

      if (!post) {
        throw new ConflictException(`Пост с id "${id}" не существует.`);
      }

      if (post.type !== patchInput.type) {
        throw new ConflictException('Невозможно изменить тип поста');
      }

      const newPost = PostEntity.fromObject(patchInput);
      return await this.postRepository.updateOne(id, newPost);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new NotFoundException(`Пост с id "${id}" не существует.`);
      }

      throw error;
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteOne(id);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Пост с идентификатором ${id} не найден.`);
      }

      throw error;
    }
  }

  async getPost(id: string): Promise<PostEntity> {
    const postEntity = await this.postRepository.findOne(id);

    if (!postEntity) {
      throw new NotFoundException(`Пост с идентификатором ${id} не найден.`);
    }

    return postEntity;
  }

  async getPosts(): Promise<PostEntity[]> {
    const posts = await this.postRepository.findAll();

    return posts;
  }
}
