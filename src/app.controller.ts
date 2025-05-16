import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola mundo!';
  }

  @Get('nuevo')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('auth/:email')
  auth(
    @Param('email') email: string,
    @Res({ passthrough: true }) res: Response,
  ): { email: string } {
    const token = this.appService.auth(email);
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60,
      path: '/',
    });
    return { email };
  }
}
