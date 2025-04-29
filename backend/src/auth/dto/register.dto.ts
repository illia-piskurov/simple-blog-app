import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  Max,
} from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    description: 'The username of the user',
    example: 'John Doe',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Username must not exceed 50 characters.' })
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    maxLength: 30,
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must exceed 50 characters.' })
  @MaxLength(30, { message: 'Password must not exceed 30 characters.' })
  password: string;
}
