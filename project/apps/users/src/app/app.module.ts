import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigUsersModule } from '@project/libs/shared/config-users';

@Module({
  imports: [ConfigUsersModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
