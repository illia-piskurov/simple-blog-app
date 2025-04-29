import { IsString, IsNotEmpty, IsEmail, MaxLength, MinLength, Max } from 'class-validator';

export class LoginRequest {
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