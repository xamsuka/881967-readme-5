import { ConflictException, Injectable } from '@nestjs/common';

import { BaseQueryParam } from '@project/libs/shared/core';
import { compare, hash } from 'bcrypt';
import {
  NEW_PASSWORD_MATCH_CURRENT,
  PASSWORD_DOES_NOT_MATCH,
  SALT_OR_ROUNDS,
  USES_EXISTS,
} from './constants/users.constants';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { RestorePasswordRequestDto } from './dto/restore-user-password.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUserById(id: string) {
    return this.usersRepository.findOne(id);
  }

  async getUsers(query?: BaseQueryParam) {
    return this.usersRepository.findMany(query);
  }

  async createUser(user: CreateUserRequestDto): Promise<UserEntity> {
    const { email, password } = user;
    const existUser = await this.usersRepository.finByEmail(email);

    if (existUser) {
      throw new ConflictException(USES_EXISTS);
    }

    const newUserEntity = await new UserEntity(user).setPassword(password);

    return this.usersRepository.createOne(newUserEntity);
  }

  async updateUserPassword(
    id: string,
    credentials: RestorePasswordRequestDto
  ): Promise<UserEntity> {
    const entityUser = await this.usersRepository.findOne(id);
    const { currentPassword, newPassword } = credentials;

    const isMatchCurrentPassword = await compare(
      currentPassword,
      entityUser.password
    );

    const isMatchNewPassword = await compare(newPassword, entityUser.password);

    if (isMatchNewPassword) {
      throw new ConflictException(NEW_PASSWORD_MATCH_CURRENT);
    }

    if (!isMatchCurrentPassword) {
      throw new ConflictException(PASSWORD_DOES_NOT_MATCH);
    }

    const newUser = await entityUser.setPassword(newPassword);

    return this.usersRepository.updateOne(id, newUser);
  }
}
