import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { UsersService } from '../services/users.service';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwt-auth/jwt-auth.guard';
import { RoleGuard } from '../../guards/roleguard/role.guard';
import { Roles } from '../../decorators/roles.decorator';

@Resolver()
@UseGuards(JwtAuthGuard)
export class UserResolver {

  constructor(private readonly userService: UsersService) {}


  @Query()
  users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query()
  user(_, {id}): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation()
  @Roles('admin')
  @UseGuards(RoleGuard)
  addUser(_, { data }): Promise<User> {
    return this.userService.create(data);
  }


  @Mutation()
  updateUser(_, { id, data }): Promise<User> {
    return this.userService.update(id, data);
  }

  @Mutation()
  @Roles('admin')
  @UseGuards(RoleGuard)
  deleteUser(_, { id }): Promise<string> {
    return this.userService.remove(id);
  }

}
