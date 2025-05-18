import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Category } from '../../database/graphql';
import { CategoriesService } from '../services/categories.service';

@Resolver()
export class CategoryResolver {

  constructor(private readonly categoriesServiceService: CategoriesService) {}


  @Query()
  categories(): Promise<Category[]> {
    return this.categoriesServiceService.findAll();
  }

  @Query()
  category(_, {id}): Promise<Category> {
    return this.categoriesServiceService.findOne(id);
  }

  @Mutation()
  addCategory(_, { data }): Promise<Category> {
    return this.categoriesServiceService.create(data);
  }

  @Mutation()
  updateCategory(_, { id, data }): Promise<Category> {
    return this.categoriesServiceService.update(id, data);
  }

  @Mutation()
  deleteCategory(_, { id }): Promise<string> {
    return this.categoriesServiceService.remove(id);
  }
}
