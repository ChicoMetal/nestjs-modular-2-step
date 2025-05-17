import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'lorem lorem',
      price: 10000,
      stock: 300,
      image: 'https://i.imgur.com/U4iGx1j.jpeg',
    },
  ];

  constructor(private readonly prismaService: PrismaService) { }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: string) {
    const product = this.prismaService.product.findUnique({
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
    return this.prismaService.product.create({
      data
    });
  }

  update(id: number, changes: UpdateProductDto) {
    const index = this.products.findIndex((item) => item.id === id);
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
