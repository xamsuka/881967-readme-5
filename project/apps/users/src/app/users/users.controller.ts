import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { LoginUserResponseDto } from '../auth/dto/login-user.dto';

@Controller('users')
export class UsersController {}
