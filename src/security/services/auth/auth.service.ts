import { Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponse, AuthTokenResponse } from '../../../users/dtos/auth.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(userName: string, password: string): Promise<AuthTokenResponse> {
    const user: User = await this.usersService.findOneByUserName(userName);

    if (user?.password == password) {
      const {password, ...userInfo} = user;
      const access_token = this.jwtService.sign(userInfo);
      return Promise.resolve({access_token, user: userInfo});
    }

    return null;
  }

  async auth(userName: string, password: string): Promise<UserResponse> {
    const user: User = await this.usersService.findOneByUserName(userName);

    if (user?.password == password) {
      const {password, ...userInfo} = user;
      return userInfo;
    }

    return null;
  }

}
