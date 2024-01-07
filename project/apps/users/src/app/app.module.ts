import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigUsersModule } from '@project/libs/shared/config-users';
import { getMongooseOptions } from '@project/libs/shared/helpers';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigUsersModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
