import { Injectable } from '@nestjs/common';
import { UsersService } from './users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  auth(userName: string): string {
    const user: User = this.usersService.findOneByUserName(userName);
    return this.jwtService.sign({
      id: user.id,
      user: user.email,
      role: user.role,
    });
  }
}
