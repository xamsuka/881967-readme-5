import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmpty, IsOptional } from 'class-validator';
import { UserDto } from '../dto/user.dto';

export class UserRdo extends OmitType(UserDto, ['password'] as const) {}
