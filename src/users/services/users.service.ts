import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { Order } from '../entities/order.entity';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService) { }

  findAll(): Promise<User[]> {
      return this.prismaService.user.findMany();
    }

  async findOne(id: string): Promise<User> {
      const user = await this.prismaService.user.findUnique({
        where: {
          id
        },
      });
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    }

  async findOneByUserName(userName: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
        where: {
          email: userName,
        },
      });
      if (!user) {
        throw new NotFoundException(`User #${userName} not found`);
      }
      return user;
  }

  async isUserExists(userName: string): Promise<User> {
    return await this.prismaService.user.findUnique({
        where: {
          email: userName,
        },
      });
  }

  async authorization(userName: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
        where: {
          email: userName,
          password
        },
      });
      if (!user) {
        throw new NotFoundException(`Bad request`);
      }
      return user;
  }

  create(data: CreateUserDto): Promise<User> {
    const newData = { ...data, createAt: new Date()};
    return this.prismaService.user.create({
      data: newData
    });
  }

  async update(id: string, changes: UpdateUserDto): Promise<User> {
    this.findOne(id);
    const data = {...changes, updateAt: new Date()};
    return this.prismaService.user.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: string): Promise<string> {
    const product: User = await this.findOne(id);
    await this.prismaService.product.delete({
      where: {
        id: product.id
      }
    });
    return Promise.resolve(product.id);
  }

  getOrderByUser(id: number): Order {
    return null;
    // const user = this.findOne(id);
    // const products = this.productService.findAll();
    // return {
    //   date: new Date(),
    //   user: user,
    //   products: products,
    // };
  }
}
