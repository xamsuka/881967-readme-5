import { Body, Controller, Patch, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
} from './dto/login-user.dto';
import { CreateUserRequestDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('login')
  login(
    @Body() loginRequestDto: LoginUserRequestDto
  ): Promise<LoginUserResponseDto> {
    return this.authService.validateUser(loginRequestDto);
  }

  @Post('registration')
  registration(
    @Body() createUserRequestDto: CreateUserRequestDto
  ): Promise<LoginUserResponseDto> {
    return this.usersService.createOne(createUserRequestDto);
  }

  @Patch('restore-password')
  restorePassword(@Request() req, @Body() updatePasswordRequestDto: any) {
    return this.usersService.updatePassword(req.user, updatePasswordRequestDto);
  }
}
