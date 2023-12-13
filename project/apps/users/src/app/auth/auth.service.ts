import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
} from './dto/login-user.dto';
import { CreateUserRequestDto } from '../users/dto/create-user.dto';
import { RestorePasswordRequestDto } from '../users/dto/restore-user-password.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(user: LoginUserRequestDto): Promise<LoginUserResponseDto> {
    return '';
  }
}
