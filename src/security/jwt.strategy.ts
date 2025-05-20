import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../users/services/users.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { find, of } from 'rxjs';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
  });
  }

  async validate(user: any): Promise<any> {
    const findUser = await this.usersService.findOneByUserName(user.email);
    const {password, ...userInfo} = findUser;
    return of(userInfo);
  }
}
