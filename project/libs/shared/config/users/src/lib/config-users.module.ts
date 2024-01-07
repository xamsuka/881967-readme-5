import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfiguration from './configs/app.config';
import mongoConfiguration from './configs/mongo.config';

const ENV_USERS_FILE_PATH = 'apps/users/users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfiguration, mongoConfiguration],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class ConfigUsersModule {}
