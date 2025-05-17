import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      description: 'Category 1',
    },
  ];

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
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, changes: UpdateCategoryDto) {
    // const category = this.findOne(id);
    const index = this.categories.findIndex((item) => item.id === id);
    // this.categories[index] = {
    //   ...category,
    //   ...changes,
    // };
    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
