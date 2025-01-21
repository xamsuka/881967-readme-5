import { Module } from '@nestjs/common';

import { BlogsModule } from './blogs/blogs.module';
import { ConfigBlogsModule } from '@project/shared/config/blogs';

@Module({
  imports: [BlogsModule, ConfigBlogsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
