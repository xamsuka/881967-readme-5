import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { fillDto } from '@project/libs/shared/helpers';
import { CreateUserRequestDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dto/login-user.dto';
import { LoginUserResponseRdo } from './rdo/login-user.rdo';
import { RestorePasswordRequestDto } from '../users/dto/restore-user-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

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
  @ApiBody({ type: LoginUserRequestDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginUserResponseRdo> {
    return req.user;
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
  async restorePassword(
    @Request() req,
    @Body() updatePasswordRequestDto: RestorePasswordRequestDto
  ): Promise<LoginUserResponseRdo> {
    const updatedUser = await this.usersService.updatePassword(
      req.user,
      updatePasswordRequestDto
    );

    return fillDto(LoginUserResponseRdo, updatedUser.toPOJO());
  }
}
