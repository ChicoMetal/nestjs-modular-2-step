import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
  });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.auth(username, password);
    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
