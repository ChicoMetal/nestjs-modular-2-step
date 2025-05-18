import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {

  constructor(private readonly prismaService: PrismaService) { }

  findAll() {
    return this.prismaService.category.findMany();
  }

  findOne(id: string) {
    const category = this.prismaService.category.findUnique({
      where: {
        id
      }
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newData = { ...data, createAt: new Date()}
    return this.prismaService.category.create({
      data: newData
    });
  }

  update(id: string, changes: UpdateCategoryDto) {
    this.findOne(id);
    const data = { ...changes, updateAt: new Date() };
    return this.prismaService.category.update({
      where: {
        id
      },
      data
    })
  }

  async remove(id: string): Promise<string> {
    const category: Category = await this.findOne(id);
    await this.prismaService.category.delete({
      where: {
        id: category.id
      }
    });
    return Promise.resolve(category.id);
  }
}
