import { Module } from '@nestjs/common';

import { BlogsModule } from './blogs/blogs.module';
import { ConfigBlogsModule } from '@project/shared/config/blogs';
import { PostModule } from './posts/post.module';

@Module({
  imports: [ConfigBlogsModule, BlogsModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
