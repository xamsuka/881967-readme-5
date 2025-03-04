import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaClientModule } from '@project/libs/shared/blogs/models';
import { PostRepository } from './post.repository';

@Module({
  controllers: [PostController],
  providers: [PostService, PostRepository],
  imports: [PrismaClientModule],
})
export class PostModule {}
