import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(
    @Body() loginDto: { email: string; password: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const { access_token, user } = await this.authService.login(loginDto);

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // только через HTTPS в продакшене
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 час
    });

    return { user }; // можно вернуть например профиль пользователя без пароля
  }
}
