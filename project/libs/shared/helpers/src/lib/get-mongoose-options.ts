import {
  MongoConfig,
  usersConfigNamespace,
} from '@project/libs/shared/config-users';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from './common';


export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      const {
        host,
        name: databaseName,
        password,
        port,
        username,
        authDatabase,
      } = config.get<MongoConfig>(usersConfigNamespace.mongo);

      return {
        uri: getMongoConnectionString({
          username,
          password,
          host,
          port,
          authDatabase,
          databaseName,
        }),
      };
    },
    inject: [ConfigService],
  };
}
