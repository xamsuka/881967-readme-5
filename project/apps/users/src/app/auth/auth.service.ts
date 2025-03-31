import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenPayload, User } from '@project/libs/shared/types';
import { compare } from 'bcrypt';
import { UserEntity } from '../users/user.entity';
import { UsersRepository } from '../users/users.repository';
import { NOT_REGISTERED, WRONG_CREDENTIALS } from './constants/auth.constants';
import { LoginUserRequestDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(user: LoginUserRequestDto): Promise<UserEntity | null> {
    try {
      const { password, email } = user;

      const entityUser = await this.usersRepository.finByEmail(email);

      if (!entityUser) {
        throw new NotFoundException(NOT_REGISTERED);
      }

      const isMatch = await compare(password, entityUser.password);

      if (isMatch) {
        return entityUser;
      } else {
        throw new UnauthorizedException(WRONG_CREDENTIALS);
      }
    } catch (error) {
      throw error;
    }
  }

  public async createUserToken(user: User): Promise<Token> {
    const payload: TokenPayload = {
      email: user.email,
      username: user.username,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
