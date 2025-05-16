import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { UsersService } from '../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const cookies = request.headers.cookie;
    const cookieObject = cookies?.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
    const token = cookieObject ? cookieObject['access_token'] : null;
    if (!token) throw new BadRequestException(`Invalid request`);

    const user = this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });
    const findUser = this.usersService.findOneByUserName(user.user);
    return of(!!findUser);
  }
}
