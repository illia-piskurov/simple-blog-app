import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength, Max } from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    description: 'Username',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: "Username must not exceed 50 characters." })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "Password must exceed 50 characters." })
  @MaxLength(30, { message: "Password must not exceed 30 characters." })
  password: string;
}