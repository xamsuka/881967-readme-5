import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { BlogsRepository } from './blogs.repository';
import { PrismaClientModule } from '@project/libs/shared/blogs/models';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository],
})
export class BlogsModule {}
