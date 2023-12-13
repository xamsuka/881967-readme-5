import { Injectable } from '@nestjs/common';
import { LoginUserResponseDto } from '../auth/dto/login-user.dto';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { RestorePasswordRequestDto } from './dto/restore-user-password.dto';

@Injectable()
export class UsersService {
  async createOne(user: CreateUserRequestDto): Promise<LoginUserResponseDto> {
    return;
  }

  async updatePassword(credentials: RestorePasswordRequestDto): Promise<void> {
    return;
  }
}
