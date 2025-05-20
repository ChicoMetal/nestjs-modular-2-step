import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponse, AuthTokenResponse, LoginUserInput } from '../../../users/dtos/auth.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async getToken(userName: string, password: string): Promise<AuthTokenResponse> {
    const user: User = await this.usersService.findOneByUserName(userName);
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      const {password, ...userInfo} = user;
      const access_token = this.jwtService.sign(userInfo);
      return Promise.resolve({access_token, user: userInfo});
    }

    return null;
  }

  async auth(userName: string, password: string): Promise<UserResponse> {
    const user: User = await this.usersService.findOneByUserName(userName);
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      const {password, ...userInfo} = user;
      return userInfo;
    }

    return null;
  }

  async signup(loginUserInput: LoginUserInput) {
    const user = await this.usersService.isUserExists(loginUserInput.userName);
    if(user) {
      throw new Error('User already exists');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);
    return this.usersService.create({
      email: loginUserInput.userName,
      password: password,
      role: 'default'
    });

  }

}
