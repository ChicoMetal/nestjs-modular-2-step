import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { Brand } from '@prisma/client';

@Injectable()
export class BrandsService {

  constructor(private readonly prismaService: PrismaService) { }

  findAll() {
    return this.prismaService.brand.findMany();
  }

  async findOne(id: string): Promise<Brand> {
    const brand: Brand = await this.prismaService.brand.findUnique({
      where: {
        id
      }
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return Promise.resolve(brand);
  }

  create(data: CreateBrandDto) {
    const newData = { ...data, createAt: new Date() };
    return this.prismaService.brand.create({
      data: newData
    });
  }

  update(id: string, changes: UpdateBrandDto) {
    this.findOne(id);
    const data = { ...changes, updateAt: new Date() };
    return this.prismaService.brand.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: string): Promise<string> {
    const brand: Brand = await this.findOne(id);
    await this.prismaService.brand.delete({
      where: {
        id: brand.id
      }
    });
    return Promise.resolve(brand.id);
  }
}
