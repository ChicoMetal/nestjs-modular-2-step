import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {

  constructor(private readonly prismaService: PrismaService) { }

  findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id
      }
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newData = { ...data, createAt: new Date()};
    return this.prismaService.product.create({
      data: newData
    });
  }

  update(id: string, changes: UpdateProductDto) {
    this.findOne(id);
    const data = {...changes, updateAt: new Date()};
    return this.prismaService.product.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: string): Promise<string> {
    const product: Product = await this.findOne(id);
    await this.prismaService.product.delete({
      where: {
        id: product.id
      }
    });
    return Promise.resolve(product.id);
  }

  findByCategory(categoryId: string): Promise<Product[]> {
    return this.prismaService.product.findMany({
      where: {
        categoryId: categoryId
      }
    });
  }
}
