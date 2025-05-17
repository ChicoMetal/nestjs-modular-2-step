import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Category } from '../../database/graphql';
import { CategoriesService } from '../services/categories.service';

@Resolver()
export class CategoryResolver {

  constructor(private readonly categoriesServiceService: CategoriesService) {}


  @Query()
  categories(): Category[] {
    return this.categoriesServiceService.findAll() as unknown as Category[];
  }

  @Query()
  category(_, {id}): Category {
    return this.categoriesServiceService.findOne(id) as unknown as Category;
  }

  @Mutation()
  addCategory(_, { data }): Category {
    return this.categoriesServiceService.create(data) as unknown as Category;
  }
}
