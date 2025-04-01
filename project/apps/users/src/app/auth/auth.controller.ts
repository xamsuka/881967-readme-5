import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { fillDto } from '@project/libs/shared/helpers';
import { CreateUserRequestDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginUserRequestDto } from './dto/login-user.dto';
import {
  LoginUserResponseRdo,
  UserWithoutPasswordRdo,
} from './rdo/login-user.rdo';
import { RestorePasswordRequestDto } from '../users/dto/restore-user-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
    const createUserTokenResult = await this.authService.createUserToken(
      req.user
    );

    return {
      user: fillDto(UserWithoutPasswordRdo, req.user),
      token: createUserTokenResult.accessToken,
    };
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
    const user = await this.usersService.createUser(createUserRequestDto);
    const createUserTokenResult = await this.authService.createUserToken(user);

    return {
      user: fillDto(UserWithoutPasswordRdo, user),
      token: createUserTokenResult.accessToken,
    };
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @Patch('restore-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async restorePassword(
    @Request() req,
    @Body() updatePasswordRequestDto: RestorePasswordRequestDto
  ): Promise<void> {
    await this.usersService.updateUserPassword(
      req.user.id,
      updatePasswordRequestDto
    );
  }
}
