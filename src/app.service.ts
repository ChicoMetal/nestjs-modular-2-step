import { Injectable } from '@nestjs/common';
import { UsersService } from './users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { AuthResponse } from './users/dtos/auth.dto';

@Injectable()
export class AppService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async auth(userName: string, password: string): Promise<AuthResponse> {
    const user: User = await this.usersService.authorization(userName, password);
    const access_token = this.jwtService.sign({
      id: user.id,
      user: user.email,
      role: user.role,
    });
    return Promise.resolve({access_token, userName: user.email});
  }
}
