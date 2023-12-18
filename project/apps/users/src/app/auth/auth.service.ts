import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
} from './dto/login-user.dto';
import { CreateUserRequestDto } from '../users/dto/create-user.dto';
import { RestorePasswordRequestDto } from '../users/dto/restore-user-password.dto';
import { UsersRepository } from '../users/users.repository';
import { compare } from 'bcrypt';
import { WRONG_CREDENTIALS } from './constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async validateUser(user: LoginUserRequestDto): Promise<LoginUserResponseDto> {
    try {
      const { password, email } = user;

      const entityUser = await this.usersRepository.finByEmail(email);

      if (!entityUser) return null;

      const isMatch = await compare(password, entityUser.password);

      if (isMatch) {
        const { password, ...result } = entityUser;

        return result;
      } else {
        throw new HttpException(WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }
}
