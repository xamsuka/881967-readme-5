import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dto/login-user.dto';
import { CreateUserRequestDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserResponseRdo } from './rdo/login-user.rdo';
import { fillDto } from '@project/libs/shared/helpers';
import { Expose } from 'class-transformer';

export class UserRdo {
  public id: string;
}

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @ApiResponse({
    type: LoginUserResponseRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  async login(
    @Body() loginRequestDto: LoginUserRequestDto
  ): Promise<LoginUserResponseRdo> {
    const user = await this.authService.validateUser(loginRequestDto);
    return fillDto(LoginUserResponseRdo, user.toPOJO());
  }

  @ApiResponse({
    type: LoginUserResponseRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('registration')
  async registration(
    @Body() createUserRequestDto: CreateUserRequestDto
  ): Promise<LoginUserResponseRdo> {
    const user = await this.usersService.createOne(createUserRequestDto);

    return fillDto(LoginUserResponseRdo, user.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Patch('restore-password')
  async restorePassword(@Request() req, @Body() updatePasswordRequestDto: any) {
    return this.usersService.updatePassword(req.user, updatePasswordRequestDto);
  }
}
