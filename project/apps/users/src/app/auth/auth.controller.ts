import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserRequestDto,
  LoginUserResponseDto,
} from './dto/login-user.dto';
import { CreateUserRequestDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @ApiResponse({
    type: LoginUserRequestDto,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  login(
    @Body() loginRequestDto: LoginUserRequestDto
  ): Promise<LoginUserResponseDto> {
    debugger;
    return this.authService.validateUser(loginRequestDto);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('registration')
  registration(
    @Body() createUserRequestDto: CreateUserRequestDto
  ): Promise<LoginUserResponseDto> {
    return this.usersService.createOne(createUserRequestDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Post('registration')
  @Patch('restore-password')
  restorePassword(@Request() req, @Body() updatePasswordRequestDto: any) {
    return this.usersService.updatePassword(req.user, updatePasswordRequestDto);
  }
}
