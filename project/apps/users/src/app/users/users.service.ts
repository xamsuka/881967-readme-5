import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserRequestDto } from './dto/create-user.dto';
import { RestorePasswordRequestDto } from './dto/restore-user-password.dto';
import { UsersRepository } from './users.repository';
import {
  PASSWORD_DOES_NOT_MATCH,
  SALT_OR_ROUNDS,
  USES_EXISTS,
} from './constants/users.constants';
import { UserEntity } from './user.entity';
import { compare, hash } from 'bcrypt';
import { LoginUserResponseRdo } from '../auth/rdo/login-user.rdo';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  async createOne(user: CreateUserRequestDto): Promise<UserEntity> {
    const { email, password } = user;
    const existUser = await this.usersRepository.finByEmail(email);

    if (existUser) {
      throw new ConflictException(USES_EXISTS);
    }

    const newUserEntity = await new UserEntity(user).setPassword(password);

    return this.usersRepository.createOne(newUserEntity);
  }

  async updatePassword(
    user: LoginUserResponseRdo,
    credentials: RestorePasswordRequestDto
  ): Promise<UserEntity> {
    const entityUser = await this.usersRepository.findOne(user.id);
    const { currentPassword, newPassword } = credentials;

    const isMatch = await compare(currentPassword, entityUser.password);

    if (!isMatch) {
      throw new ConflictException(PASSWORD_DOES_NOT_MATCH);
    }

    const newPasswordHash = await hash(newPassword, SALT_OR_ROUNDS);

    const newUser = await entityUser.setPassword(newPasswordHash);

    return this.usersRepository.updateOne(user.id, newUser);
  }
}
