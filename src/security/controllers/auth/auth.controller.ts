import { Controller, Get, Param, Res } from '@nestjs/common';
import { AuthService  } from '../../services/auth/auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Get('/:email/:pass')
  auth(
    @Param('email') email: string,
    @Param('pass') password: string,
    @Res({ passthrough: true }) res: Response,
  ): { email: string } {
    const token = this.authService.getToken(email, password);
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
      path: '/',
    });
    return { email };
  }

}
