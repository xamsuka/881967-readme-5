import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import blogsApplicationConfig from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [blogsApplicationConfig],
    }),
  ],
})
export class ConfigBlogsModule {}
