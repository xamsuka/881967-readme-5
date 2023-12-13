import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
} from './dto/login-user.dto';
import { CreateUserRequestDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginRequestDto: LoginUserRequestDto
  ): Promise<LoginUserResponseDto> {
    return this.authService.validateUser(loginRequestDto);
  }
}
